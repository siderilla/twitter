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
--- collection di users + cinguettii

1) quando l'utente è loggato nella navbar: ciao, nomeutente!
2) inserire una guard nella root che non faccia loggare né in login né in register
3) fatelo bello ONIICHAN

======================================================================================

router.navigate
- Type: Method
- What it does: Imperatively navigates to a route. It triggers navigation immediately and changes the browser’s URL
- Usage: router.navigate(['/login']);
- Side effect: Actually performs the navigation as soon as it’s called

router.createUrlTree
- Type: Method
- What it does: Creates a UrlTree object representing a route, but does not trigger navigation
- Usage: return router.createUrlTree(['/login']);
- Side effect: No navigation happens. You return the UrlTree from a guard, and Angular will handle the navigation if the guard blocks access

GUARDS:
router.navigate: Not recommended in guards, because it triggers navigation as a side effect and can cause navigation loops or errors
router.createUrlTree: Recommended in guards. Returning a UrlTree tells Angular to redirect the user safely
Example (recommended for guards):
if (!authorized && !user) {
  return router.createUrlTree(['/login']);
}

SUMMARY:
Use router.createUrlTree in guards
Use router.navigate in components or services when you want to navigate programmatically

======================================================================================

COMPITI WEEKEND delle elezioni comunali
!!!!!!!!!!!!!!!! leaflet !!!!!!!!!!!!!!!!
framework di map, il più utilizzato sul web in assoluto
lo facciamo tutto da soli
info: GeoJSON - json per i dati geografici
ciascun tweet saranno localizzati su mappa (tanti puntini)
funzione -> array di [cinguettii] convertito in GeoJSON

