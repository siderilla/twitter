import { Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { from } from 'rxjs';
import { updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  user = signal<User | null>(null);
  loading = signal(true); // aggiungi questo

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
      this.loading.set(false); // utente caricato
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
