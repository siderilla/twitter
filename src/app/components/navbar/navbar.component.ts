import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-navbar',
	imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

	authService = inject(AuthService);
	router = inject(Router);

	get isLoggedIn() {
		return this.authService.isAuthorized();
	}

	get isLoginPage() {
		return this.router.url.includes('login');
	}

	get isRegistrationPage() {
		return this.router.url.includes('registration');
	}

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

	register() {
		throw new Error('Method not implemented.');
	}
	login() {
		throw new Error('Method not implemented.');
	}

}
