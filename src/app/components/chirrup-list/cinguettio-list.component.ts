import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CinguettioService } from '../../services/cinguettio.service';
import { CinguettioFormComponent } from '../chirrup-form/cinguettio-form.component';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-cinguettio-list',
	imports: [CommonModule, MatButtonModule, MatInputModule, CinguettioFormComponent, MatCardModule],
	templateUrl: './cinguettio-list.component.html',
	styleUrl: './cinguettio-list.component.scss'
})
export class CinguettioListComponent {

	authService = inject(AuthService);
	cinguettioService = inject(CinguettioService);
	router = inject(Router);


	cinguettioList: any[] = []; //inizializzo la proprietà chirrupList come array vuoto

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
