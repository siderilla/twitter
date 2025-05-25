import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CinguettioService } from '../../services/cinguettio.service';
import { Router } from '@angular/router';
import { CinguettioFormComponent } from "../cinguettio-form/cinguettio-form.component";
import { CinguettioListComponent } from "../cinguettio-list/cinguettio-list.component";
import { MapComponent } from "../map/map.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatIconModule, CinguettioFormComponent, CinguettioListComponent, MapComponent, MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  authService = inject(AuthService);
  cinguettioService = inject(CinguettioService);
  router = inject(Router);

  showToolbar = true;
  isSidenavOpen = false;

  showWelcomeText = true;

ngOnInit() {

  setTimeout(() => {
    this.showToolbar = true;
  }, 50);

  // nasconde il messaggio dopo 10 secondi
  setTimeout(() => {
    this.showWelcomeText = false;
  }, 3000); // 3000 milliseconds = 3 seconds
}


  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.error('Logout failed', err)
    });
  }

  editProfile() {
    console.log('Modifica profilo utente');
  }


}
