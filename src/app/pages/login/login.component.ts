import { Component, ViewChild, inject, signal } from '@angular/core';
import { LoginService } from '../../services/api/login/login.service';
import { IloginResponse } from '../../interfaces/iloginResponse';
import { FormsModule } from '@angular/forms';
import { Ilogin } from '../../interfaces/ilogin';
import { Router } from '@angular/router';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgbAlertModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  #loginService = inject(LoginService);
  #router = inject(Router);

  public loginObject: Ilogin =  {
    login: '',
    senha: ''
  };

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

  public token = signal<null | IloginResponse>(null);

  public showMessage: boolean = false;

  public efetuarLogin() {
    
    this.#loginService.httpPostLogin$(this.loginObject).subscribe({
      next: (next) => {
        if(next) {
          sessionStorage.setItem('token',  next.token);
          sessionStorage.setItem('cargo', next.cargo);
          sessionStorage.setItem('id', next.id);
          this.#router.navigate(['']).then(() => {
            window.location.reload()
          });
        }
      },
      error: () => {
        console.log('error');
        this.showMessage = true;
        setTimeout(() =>{
          this.showMessage= false
        }, 5000)
      }
    })
  }
}
