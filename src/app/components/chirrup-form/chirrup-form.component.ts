import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ChirrupService } from '../../services/chirrup.service';

@Component({
  selector: 'app-chirrup-form',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './chirrup-form.component.html',
  styleUrl: './chirrup-form.component.scss'
})
export class ChirrupFormComponent {

  authService = inject(AuthService);
  chirrupService = inject(ChirrupService);
  router = inject(Router);

  chirrup = '';


  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/login']);

      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }

  addChirrup() {
    this.chirrupService.addChirrup(this.chirrup)
      .then(() => {
        this.chirrup = ''; // Reset the input field after adding the chirrup
        console.log('Chirrup added successfully');
        this.router.navigate(['/list']);
      })
      .catch((error) => {
        console.error('Error adding chirrup', error);
      });
  }


}
