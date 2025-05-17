import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = { //serve per la connessione a Firebase

  apiKey: "AIzaSyB5ALX7plUke7_JKaV0PW_Lh5ABEQlfA3A", //chiave API
  authDomain: "chirrup-611ca.firebaseapp.com", //dominio di autenticazione
  projectId: "chirrup-611ca", //ID del progetto
  storageBucket: "chirrup-611ca.firebasestorage.app", //bucket di archiviazione
  messagingSenderId: "935604106597", //ID del mittente dei messaggi
  appId: "1:935604106597:web:3dffef26ba4da179ba5d8c" //ID dell'app

};


export const appConfig: ApplicationConfig = { //inizializza l'applicazione Angular
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), //per il rilevamento delle modifiche
    provideRouter(routes), //per il routing
    provideFirebaseApp(() => initializeApp(firebaseConfig)), //per Firebase
    provideAuth(() => getAuth()), //per l'autenticazione Firebase
    provideFirestore(() => getFirestore()) //per Firestore
  ]
};
