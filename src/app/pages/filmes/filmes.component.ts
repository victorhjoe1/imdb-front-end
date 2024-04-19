import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IfilmesRequest } from '../../interfaces/ifilmesRequest';
import { FilmesServiceService } from '../../services/api/filmes/filmes-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.css'
})
export class FilmesComponent {
  #filmeService = inject(FilmesServiceService);
  #router = inject(Router);

  public filme: IfilmesRequest = {
    nome: '',
    descricao: '',
    diretor : '',
    genero: '',
    atores: '',
    votos: []
  }

  public cadastrarFilme() {
    const authToken = sessionStorage.getItem('token')

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    
    this.#filmeService.postFilme$(this.filme, headers).subscribe({
      next: (next => {
        if(next) {
          this.#router.navigate(['']);
        }

      })
    })
  }

}
