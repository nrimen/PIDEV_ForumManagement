import { Component, OnInit } from '@angular/core';
import { OfferServicesService } from '../../Core/Services/OfferServices/offer-services.service';
import { Router } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  offerCounts: { location: string, count: number }[] = [];


  constructor(private offerService: OfferServicesService , private router: Router) { }

  ngOnInit(): void {
    this.loadGoogleMapsScript(() => {
      this.offerService.getOfferCountsByLocation().subscribe((data: { location: string, count: number }[]) => {
        this.offerCounts = data;
        console.log("offers count : ",data) ;
        this.initMap();
      });
    });
  }

  loadGoogleMapsScript(callback: () => void) {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDYCukBAHbPvhHzmPsDl1YHREiEaeXkzyQ&libraries=places&v=3.55';
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 2
    });

    // Parcourir chaque entrée de l'objet this.offerCounts
    Object.entries(this.offerCounts).forEach(([location, count]) => {
      // Diviser la chaîne de location pour obtenir les coordonnées
      const coordinates = location.split(', ');
      const lat = parseFloat(coordinates[0]);
      const lng = parseFloat(coordinates[1]);

      // Créer un marqueur pour chaque location avec le nombre d'offres
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: `${location}: ${count} offres`
      });
      // Ajouter un gestionnaire d'événements pour écouter les clics sur les marqueurs
      marker.addListener('click', () => {
        // Naviguer vers la page ViewOfferByLocation avec la localisation comme paramètre
        this.router.navigate(['/ViewOfferByLocation'], { queryParams: { location } });
      });
    });
  }


 /* extractCoordinatesFromLocation(location: string): { lat: number, lng: number } {
    const coordsArray = location.split(',');
    const lat = parseFloat(coordsArray[0]);
    const lng = parseFloat(coordsArray[1]);
    return { lat, lng };
  }*/
}
