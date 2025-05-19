VANILLA FIREBASE:
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

- inizializza firebase alla vecchia maniera senza passare da angular
- ottieni istanze di firestore, auth, etc... direttamente
- sei tu a gestire il ciclo di vita

- NON è integrato con il sistema di Dependency Injection di angular

- si usa in app vanilla (js puro, react, ...)
- si usa se non serve usare signals, DI, reactive tools, etc...

======================================================================================

ANGULARFIRE:
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

- registra tutto come provider Angular -> si può usare inject()
- si integra con zone: signals, computed, effects, toSignal(), RxJS
- automaticamente disponibile ovunque nei services

- si configura all'avvio (app.config / main)

- si usa quando si vuole scrivere un servizio reattivo, pulito e idiomatico

======================================================================================

--- aggiusta la modularizzazione dei componenti e la UI/UX
