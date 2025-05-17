import { Injectable, signal } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, query, orderBy } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Chirrup } from '../models/chirrup';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChirrupService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  chirrups = signal<Chirrup[]>([]);

  constructor() {
    const chirrupRef = collection(this.firestore, 'chirrups');
    const chirrupQuery = query(chirrupRef, orderBy('createdAt', 'desc'));

    collectionData(chirrupQuery, { idField: 'id' }).subscribe(data => {
      this.chirrups.set(data as Chirrup[]);
    });
  }

  async addChirrup(text: string, location?: { lat: number, lng: number }) {
    const user = this.authService.user();
    if (!user) return;

    const chirrup: Chirrup = {
      text,
      userId: user.uid,
      userEmail: user.email || '',
      createdAt: new Date(),
      location
    };

    const chirrupRef = collection(this.firestore, 'chirrups');
    await addDoc(chirrupRef, chirrup);
  }
}
