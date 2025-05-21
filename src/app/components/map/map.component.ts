import { Component, inject, effect } from '@angular/core';
import * as L from 'leaflet';
import { CinguettioService } from '../../services/cinguettio.service';
import { CommonModule } from '@angular/common';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  private cinguettioService = inject(CinguettioService);
  private map?: L.Map;

  constructor() {
    effect(() => {
      const geoJson = this.cinguettioService.geoCinguettii();
      if (geoJson.features.length === 0) return;

      if (this.map) {
        this.map.remove(); // Rimuovi mappa precedente se serve
      }

      this.map = L.map('map').setView([44.4, 8.9], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      L.geoJSON(geoJson, {
        pointToLayer: (feature, latlng) =>
          L.marker(latlng).bindPopup(`
            <b>${feature.properties.text}</b><br>
            <small>${feature.properties.userEmail}</small>
          `)
      }).addTo(this.map);
    });
  }
}
