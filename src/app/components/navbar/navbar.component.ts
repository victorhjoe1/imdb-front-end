import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { FilmesServiceService } from '../../services/api/filmes/filmes-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public logged = sessionStorage.getItem('token');
  public admin = sessionStorage.getItem('cargo') == 'ADMIN';
  #router = inject(Router);

  #filmesService = inject(FilmesServiceService);
  public search = signal<string>('')

  public pequisar(){
   this.#filmesService.setPesquisa(this.search()); 
  }

  public efetuarLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('cargo')
    window.location.reload()
  }

}
