import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  authService = inject(AuthService);
  router = inject(Router);

  email = ''; //inizializzo le proprietà della classe
  userName = '';
  password = '';
  errorMessage = '';

  login() { //visto che ho un observable nel servizio, uso .subscribe() per gestire il risultato
    this.authService.login(this.email, this.password).subscribe({ //chiamo il metodo login del servizio AuthService
      next: () => { //se va a buon fine, resetto le proprietà
        this.email = ''; //resetto l'email
        this.password = ''; //resetto la password
        this.errorMessage = ''; //resetto il messaggio di errore
        this.router.navigate(['/list']);
      },
      error: (error) => { //se c'è un errore, lo gestisco
        this.errorMessage = error.code;
      }
    });

  }

  register() {
    this,this.authService.register(this.email, this.userName, this.password).subscribe({
      next: () => { 
        this.email = '';
        this.password = '';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.code;
      }
    });
  }
}
