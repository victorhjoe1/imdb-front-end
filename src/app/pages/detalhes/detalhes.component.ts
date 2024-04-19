import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ifilmes } from '../../interfaces/ifilmes';
import { FilmesServiceService } from '../../services/api/filmes/filmes-service.service';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, distinctUntilChanged, interval, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { IVotoRequest } from '../../interfaces/iVotoRequest';
import { VotoService } from '../../services/api/voto/voto.service';
import { LoginService } from '../../services/api/login/login.service';
import { IloginResponse } from '../../interfaces/iloginResponse';
import { IVotoResponse } from '../../interfaces/iVotoResponse';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css',
  providers: [NgbRatingConfig]
})
export class DetalhesComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #filmesService = inject(FilmesServiceService);
  #votosService = inject(VotoService)

  constructor(config: NgbRatingConfig) {
		config.max = 4;
	}

  public filme: Ifilmes | null  = null;
  public logged = sessionStorage.getItem('token') != undefined || sessionStorage.getItem('token') != null;
  public voto:IVotoResponse | null =  null
  public nota = 0;
  notaObservable$: Observable<number> | undefined;

  ngOnInit(): void {

    const authToken = sessionStorage.getItem('token')

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    const idUserString = sessionStorage.getItem("id")

   this.#filmesService.getFilmeById(this.#route.snapshot.params['id']).subscribe({
    next: (result) => {
      this.filme = result;
      if (idUserString) {
        const idUser = parseInt(idUserString)
  
        this.#votosService.getVotoByUserAndMovie(idUser, this.filme.id, headers).subscribe({
          next: (next => {
            this.voto = next;
            
            this.nota = next.valor;         
          })
         }) 
      }
    }
   })

    this.notaObservable$ = interval(1000).pipe(
      map(() => this.nota),
      distinctUntilChanged()
    );
  

    this.notaObservable$.subscribe(notaValue => {
      if(this.nota != null) {
        if (this.voto) {
          this.voto.valor = this.nota;
          this.#votosService.httpPutVoto$(this.voto, headers).subscribe({
            next: (voto) => {
              if(this.filme) {
                
                const index: number = this.filme.votos.findIndex(v => v.id === voto.id);

                if(index !== -1) {
                  this.filme.votos.splice(index, 1, voto)
                  this.#filmesService.putFilme(this.filme, headers).subscribe({
                    next: (filme) => {
                      return filme;
                    }
                  })
                } 
              }
            }
          });
        }
      } else {
        const idUserString = sessionStorage.getItem("id")
    
        if(idUserString && this.filme) {
          const idUser = parseInt(idUserString)
          const nota = { valor:  this.nota, idFilme: this.filme.id, idUsuario: idUser }
  
          this.#votosService.httpPostVoto$(nota, headers).subscribe({
            next: (voto) => {
                  if(this.filme) {
                    const index: number = this.filme.votos.findIndex(v => v === voto);
                    if(index !== -1) {
                      this.filme.votos.splice(index, 1, voto)
                      this.#filmesService.putFilme(this.filme, headers).subscribe({
                        next: (filme) => {
                          return filme;
                        }
                      })
                    }
                  }
            }
          });
        }
  
      }
    });
  }

}
