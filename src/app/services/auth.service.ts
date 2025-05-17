import { Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  user = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
    });
  }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  } //con from() si crea un observable a partire da una promise

  logout() {
    return from(signOut(this.auth));
  }
}
