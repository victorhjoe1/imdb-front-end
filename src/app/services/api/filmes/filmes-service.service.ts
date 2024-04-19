import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Ifilmes } from '../../../interfaces/ifilmes';
import { Observable, Subject } from 'rxjs';
import { IfilmesRequest } from '../../../interfaces/ifilmesRequest';

@Injectable({
  providedIn: 'root'
})
export class FilmesServiceService {

  #http= inject(HttpClient);

  #url = signal(environment.apiFilmes)

  private pesquisa = new Subject<string>();

  public httpListFilmes$(): Observable<Ifilmes[]> {
    return this.#http.get<Ifilmes[]>(this.#url());
  }

  public httpListFilmesSearch$(search: string): Observable<Ifilmes[]> {
    return this.#http.get<Ifilmes[]>(`${this.#url()}/search?search=${search}`);
  }

  public getFilmeById(id: string) {
    return this.#http.get<Ifilmes>(`${this.#url()}/${id}`)
  }

  setPesquisa(pesquisa: string) {
    this.pesquisa.next(pesquisa);
  }

  getPesquisa() {
    return this.pesquisa.asObservable();
  }

  putFilme(filme: Ifilmes | null, headers: HttpHeaders){
    const options = {
      headers: headers
    };
    return this.#http.put<Ifilmes>(`${this.#url()}/${filme?.id}`, filme, options)
  }

  postFilme$(filme:IfilmesRequest | null, headers: HttpHeaders) {
    const options = {
      headers: headers
    };

    return this.#http.post<Ifilmes>(this.#url(), filme, options)
  }
}
