import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Ilogin } from '../../../interfaces/ilogin';
import { Observable } from 'rxjs';
import { IloginResponse } from '../../../interfaces/iloginResponse';
import { environment } from '../../../../environments/environment.development';
import { IUpdateUsuario } from '../../../interfaces/iUpdateUsuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  #http = inject(HttpClient);
  #url = signal(environment.apiLogin);

  public httpPostLogin$(login: Ilogin): Observable<IloginResponse> {
    return this.#http.post<IloginResponse>(`${this.#url()}/login`, login);
  }

  public updateUsuario(usuario: IUpdateUsuario, id: string): Observable<IUpdateUsuario> {
    return this.#http.put<IUpdateUsuario>(`${this.#url()}/update/${id}`, usuario)
  }
}
