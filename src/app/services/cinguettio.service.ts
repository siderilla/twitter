import { computed, Injectable, signal } from '@angular/core';
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
	geoCinguettii = computed(() => this.fromCinguettiiToGeoJSON(this.cinguettii()));

	constructor() {

		const cinguettioRef = collection(this.firestore, 'cinguettii');
		// const chirrupQuery = query(chirrupRef, orderBy('createdAt', 'desc'));

		collectionData(cinguettioRef, { idField: 'id' }).subscribe(data => {
			this.cinguettii.set(data as Cinguettio[]);
			console.log(this.geoCinguettii());
		});

	}

	async addCinguettio(text: string) {
		const user = this.authService.user();
		if (!user) return;

		let location = null;

		try {
			location = await this.locationService.getLocation();
		} catch (err) {
			console.warn('📍 Geolocalizzazione fallita, si prosegue senza', err);
		}

		const cinguettio: Cinguettio = {
			text,
			userId: user.uid,
			userEmail: user.email || '',
			creationTime: Timestamp.now(),
			...(location && {
				location: {
					lat: location.coords.latitude,
					lng: location.coords.longitude
				}
			})
		};

		const ref = collection(this.firestore, 'cinguettii');
		await addDoc(ref, cinguettio);

	}

	fromCinguettiiToGeoJSON(cinguettii: Cinguettio[]): any {
		const emptyGeoJSON: any = {
			type: 'FeatureCollection',
			features: []
		};
		for (const cinguettio of cinguettii) {
			if (cinguettio.location) {
				const feature = {
					type: 'Feature',
					properties: {
						text: cinguettio.text,
						userId: cinguettio.userId,
						userEmail: cinguettio.userEmail,
						creationTime: cinguettio.creationTime.toDate()
					},
					geometry: {
						type: 'Point',
						coordinates: [cinguettio.location.lng, cinguettio.location.lat]
					}
				};
				emptyGeoJSON.features.push(feature);
			}
		}

		console.log(JSON.stringify(emptyGeoJSON));
		return emptyGeoJSON;
	}

}
