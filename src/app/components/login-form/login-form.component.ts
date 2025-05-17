import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  authService = inject(AuthService);

  email = ''; //inizializzo le proprietà della classe
  password = '';
  errorMessage = '';

  login() { //visto che ho un observable nel servizio, uso .subscribe() per gestire il risultato
    this.authService.login(this.email, this.password).subscribe({ //chiamo il metodo login del servizio AuthService
      next: () => { //se va a buon fine, resetto le proprietà
        this.email = ''; //resetto l'email
        this.password = ''; //resetto la password
        this.errorMessage = ''; //resetto il messaggio di errore
      },
      error: (error) => { //se c'è un errore, lo gestisco
        this.errorMessage = error.code;
      }
    });

  }
}
