import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {

  }

  getLocation(): Promise<any> {

    const promise = new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (location) => resolve(location),
          (error) => reject(error.message)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });

    return promise;
  }


}
