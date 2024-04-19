import { Component, OnInit, inject, signal } from '@angular/core';
import { FilmesServiceService } from '../../services/api/filmes/filmes-service.service';
import { Ifilmes } from '../../interfaces/ifilmes';
import { switchMap, debounceTime } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  #filmesService = inject(FilmesServiceService);

  public filmesList = signal<null | Ifilmes[]>(null);
  public pesquisa = signal<string>(' ');

  ngOnInit(): void {
    this.#filmesService.httpListFilmes$().subscribe({
      next: (next) => {
        this.filmesList.set(next);
      },
      error: (error) => console.log(error)
    });

    this.#filmesService.getPesquisa().pipe(
      debounceTime(300) 
    ).subscribe({
      next: (next) => {
        this.pesquisa.set(next);

        this.#filmesService.httpListFilmesSearch$(next).subscribe({
          next: (result) => {
            this.filmesList.set(result);
          },
          error: (error) => console.log(error)
        });
      }
    });
  }
}
