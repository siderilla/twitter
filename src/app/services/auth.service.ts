import { Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { from } from 'rxjs';
import { updateProfile } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private auth = inject(Auth);
	user = signal<User | null>(null);
	isAuthorized = signal(false);
	router = inject(Router);

	constructor() {
		onAuthStateChanged(this.auth, (user) => {
			if (user) {

				console.log('User is signed in:', user);
				this.isAuthorized.set(true);
				this.user.set(user);
				this.router.navigate(['/list']);

			} else {

				console.log('Onii-chan, please sign in');
				this.isAuthorized.set(false);
				this.user.set(null);

			}
		});
	}

	register(email: string, userName: string, password: string) {
		return from(
			createUserWithEmailAndPassword(this.auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					return updateProfile(user, { displayName: userName });
				})
		);
	}

	login(email: string, password: string) {
		return from(signInWithEmailAndPassword(this.auth, email, password));
	} //con from() si crea un observable a partire da una promise

	logout() {
		return from(signOut(this.auth));
	}
}
