import { Injectable, signal } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, query, orderBy, Timestamp } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Cinguettio } from '../models/cinguettio';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class CinguettioService {

  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private locationService = inject(LocationService);

  cinguettii = signal<Cinguettio[]>([]);

  constructor() {
    const cinguettioRef = collection(this.firestore, 'cinguettii');
    // const chirrupQuery = query(chirrupRef, orderBy('createdAt', 'desc'));

    collectionData(cinguettioRef, { idField: 'id' }).subscribe(data => {
      this.cinguettii.set(data as Cinguettio[]);
    });
  }

  async addCinguettio(text: string, location?: { lat: number, lng: number }) {
    const user = this.authService.user();
    if (!user) return;

    const cinguettio: any = {
      text: text,
      userId: user.uid,
      userEmail: user.email || '',
      creationTime: Timestamp.now()
    };

    this.locationService.getLocation()
      .then((location) => {
        cinguettio.location = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        };
        console.log('Location:', cinguettio.location);
      })
      .catch((error) => {
        console.error('Error getting location', error);
      });

    // if (location) {
    //   cinguettio.location = {
    //     lat: location.lat,
    //     lng: location.lng
    //   };
    // }


    const cinguettioRef = collection(this.firestore, 'cinguettii');
    await addDoc(cinguettioRef, cinguettio);
  }
}
