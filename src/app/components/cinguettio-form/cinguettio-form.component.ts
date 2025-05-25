import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CinguettioService } from '../../services/cinguettio.service';

@Component({
  selector: 'app-cinguettio-form',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './cinguettio-form.component.html',
  styleUrl: './cinguettio-form.component.scss'
})
export class CinguettioFormComponent {

  authService = inject(AuthService);
  cinguettioService = inject(CinguettioService);
  router = inject(Router);

  cinguettio = '';


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

  addCinguettio() {
    this.cinguettioService.addCinguettio(this.cinguettio)
      .then(() => {
        this.cinguettio = ''; // Reset the input field after adding the chirrup
        console.log('Cinguettio added successfully');
        this.router.navigate(['/list']);
      })
      .catch((error) => {
        console.error('Error adding cinguettio', error);
      });
  }


}
