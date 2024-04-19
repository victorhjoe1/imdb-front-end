import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IVotoRequest } from '../../../interfaces/iVotoRequest';
import { IVotoResponse } from '../../../interfaces/iVotoResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

  #http = inject(HttpClient);
  #url = signal(environment.apiVoto);

  public httpPostVoto$(voto: IVotoRequest, headers: HttpHeaders): Observable<IVotoResponse> {
    const options = {
      headers: headers
    };
    return this.#http.post<IVotoResponse>(this.#url(), voto, options);
  }

  public httpPutVoto$(voto: IVotoResponse, headers: HttpHeaders): Observable<IVotoResponse> {
    const options = {
      headers: headers
    };
    return this.#http.put<IVotoResponse>(`${this.#url()}/${voto.id}`, voto, options);
  }

  public getVotoByUserAndMovie(idUser: number, idFilme: number, headers: HttpHeaders): Observable<IVotoResponse> {
    const options = {
      headers: headers
    };
    return this.#http.get<IVotoResponse>(`${this.#url()}/user-movie?idUsuario=${idUser}&idFilme=${idFilme}`, options);
  }
}
