import {Component, OnInit} from '@angular/core';
import {OfferServicesService} from "../../Core/Services/OfferServices/offer-services.service";
import {OfferModuleModule} from "../../Core/Modules/offer-module/offer-module.module";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrls: ['./view-offers.component.css']
})
export class ViewOffersComponent implements OnInit{
  offers: OfferModuleModule[] = [];
  userId: number =0 ;
  constructor(private offerService: OfferServicesService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.offerService.getOffers().subscribe((offers)=> {
      console.log(offers)
      this.offers = offers;
    })
   // this.loadOffers(); // Chargement des offres au démarrage du composant
  }

  // loadOffers() {
  //   this.offerService.getOffers().subscribe(
  //     offers => {
  //       console.log(offers)
  //       this.offers = offers; // Assigner les offres récupérées à la propriété offers
  //     },
  //     error => {
  //       console.error('Erreur lors du chargement des offres :', error);
  //     }
  //   );
  // }

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
