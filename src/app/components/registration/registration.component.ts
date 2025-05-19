import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  authService = inject(AuthService);
  router = inject(Router);

  email = ''; //inizializzo le proprietà della classe
  username = '';
  password = '';
  errorMessage = '';

  register() {
    this.authService.register(this.email, this.username, this.password).subscribe({
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
