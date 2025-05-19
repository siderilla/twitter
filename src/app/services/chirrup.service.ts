import { Injectable, signal } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, query, orderBy, Timestamp } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Chirrup } from '../models/chirrup';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class ChirrupService {

  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private locationService = inject(LocationService);

  chirrups = signal<Chirrup[]>([]);

  constructor() {
    const chirrupRef = collection(this.firestore, 'cinguettii');
    // const chirrupQuery = query(chirrupRef, orderBy('createdAt', 'desc'));

    collectionData(chirrupRef, { idField: 'id' }).subscribe(data => {
      this.chirrups.set(data as Chirrup[]);
    });
  }

  async addChirrup(text: string, location?: { lat: number, lng: number }) {
    const user = this.authService.user();
    if (!user) return;

    const chirrup: any = {
      text: text,
      userId: user.uid,
      userEmail: user.email || '',
      creationTime: Timestamp.now()
    };

    this.locationService.getLocation()
      .then((location) => {
        chirrup.location = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        };
        console.log('Location:', chirrup.location);
      })
      .catch((error) => {
        console.error('Error getting location', error);
      });

    // if (location) {
    //   chirrup.location = {
    //     lat: location.lat,
    //     lng: location.lng
    //   };
    // }


    const chirrupRef = collection(this.firestore, 'cinguettii');
    await addDoc(chirrupRef, chirrup);
  }
}
