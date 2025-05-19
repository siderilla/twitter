import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ChirrupService } from '../../services/chirrup.service';
import { ChirrupFormComponent } from '../chirrup-form/chirrup-form.component';

@Component({
  selector: 'app-chirrup-list',
  imports: [CommonModule, MatButtonModule, MatInputModule, ChirrupFormComponent],
  templateUrl: './chirrup-list.component.html',
  styleUrl: './chirrup-list.component.scss'
})
export class ChirrupListComponent {

  authService = inject(AuthService);
  chirrupService = inject(ChirrupService);
  router = inject(Router);
  

  chirrupList: any[] = []; //inizializzo la proprietà chirrupList come array vuoto

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

}
