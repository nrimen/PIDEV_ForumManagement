import { Component } from '@angular/core';
import {OfferModuleModule} from "../../Core/Modules/offer-module/offer-module.module";
import {OfferServicesService} from "../../Core/Services/OfferServices/offer-services.service";
import {ActivatedRoute} from "@angular/router";
interface Location {
  name: string;
  coordinates: string;
}
@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent {
  offers: OfferModuleModule[] = [];
  userId: number =0 ;
  locations: Location[] = [
    { name: 'Stockholm, Sweden', coordinates: '59.3293° N, 18.0686° E' },
    { name: 'Berlin, Germany', coordinates: '52.5200° N, 13.4050° E' },
    { name: 'Moscow, Russia', coordinates: '55.7558° N, 37.6176° E' },
    { name: 'Paris, France', coordinates: '48.8566° N, 2.3522° E' },
    { name: 'London, UK', coordinates: '51.5074° N, 0.1278° W' },
    { name: 'Rome, Italy', coordinates: '41.9028° N, 12.4964° E' },
    { name: 'Warsaw, Poland', coordinates: '52.2297° N, 21.0122° E' },
    { name: 'Amsterdam, Netherlands', coordinates: '52.3667° N, 4.8945° E' },
    { name: 'Brussels, Belgium', coordinates: '50.8503° N, 4.3517° E' },
    { name: 'Copenhagen, Denmark', coordinates: '55.6761° N, 12.5683° E' },
    { name: 'Oslo, Norway', coordinates: '59.9139° N, 10.7522° E' },
    { name: 'Budapest, Hungary', coordinates: '47.4979° N, 19.0402° E' },
    { name: 'Vienna, Austria', coordinates: '48.2082° N, 16.3738° E' },
    { name: 'Helsinki, Finland', coordinates: '59.3293° N, 18.0686° E' },
    { name: 'Lisbon, Portugal', coordinates: '38.7223° N, 9.1393° W' },
    { name: 'Rabat, Morocco', coordinates: '33.9716° N, 6.8498° E' },
    { name: 'Tunis, Tunisia', coordinates: '36.8065° N, 10.1815° E' },
    { name: 'Algiers, Algeria', coordinates: '33.8938° N, 9.5375° E' },
    { name: 'Casablanca, Morocco', coordinates: '31.6295° N, 8.0083° W' },
    { name: 'Cairo, Egypt', coordinates: '30.0444° N, 31.2357° E' },
    { name: 'Washington, D.C., USA', coordinates: '38.8951° N, 77.0364° W' },
    { name: 'Montreal, Canada', coordinates: '45.5017° N, 73.5673° W' },
    { name: 'Manila, Philippines', coordinates: '14.5994° N, 120.9842° E' },
    { name: 'San Francisco, USA', coordinates: '37.7749° N, 122.4194° W' },
    { name: 'Los Angeles, USA', coordinates: '34.0522° N, 118.2437° W' },
    { name: 'Toronto, Canada', coordinates: '43.6532° N, 79.3832° W' },
    { name: 'São Paulo, Brazil', coordinates: '23.6345° S, 46.7111° W' },
    { name: 'Miami, USA', coordinates: '25.7617° N, 80.1918° W' },
    { name: 'Monterrey, Mexico', coordinates: '25.6866° N, 100.3161° W' },
    { name: 'Guadalajara, Mexico', coordinates: '20.6597° N, 103.3496° W' },
    { name: 'Dallas, USA', coordinates: '32.7767° N, 96.7970° W' },
    { name: 'New York City, USA', coordinates: '40.7128° N, 74.0060° W' },
    { name: 'Ottawa, Canada', coordinates: '45.4215° N, 75.6972° W' },
    { name: 'Mexico City, Mexico', coordinates: '19.4326° N, 99.1332° W' }
  ];
  constructor(private offerService: OfferServicesService , private route : ActivatedRoute) { }
  getLocationName(coordinates: string): string {
    const location = this.locations.find(loc => loc.coordinates === coordinates);
    return location ? location.name : '';
  }
  expandedOffers: { [key: number]: boolean } = {};
  toggleOfferDescription(offerId: number | undefined): void {
    if (offerId !== undefined) {
      this.expandedOffers[offerId] = !this.expandedOffers[offerId];
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Récupérer l'ID de l'URL et le convertir en nombre
      this.offerService.getMatchedOffersForUser(this.userId)
        .subscribe(offers => this.offers = offers);
    });
  }



  deleteOffer(offer: OfferModuleModule) {
    if (offer.idOffer !== undefined) {
      this.offerService.removeOffer(offer.idOffer).subscribe(
        () => {
          // Filtrer l'offre supprimée de la liste des offres affichées
          this.offers = this.offers.filter(o => o !== offer);
        },
        error => {
          console.error('Erreur lors de la suppression de l\'offre :', error);
        }
      );
    } else {
      console.error('L\'identifiant de l\'offre est indéfini.');
    }
  }

}
