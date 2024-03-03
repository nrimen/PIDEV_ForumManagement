import { Component } from '@angular/core';
import {OfferModuleModule} from "../../Core/Modules/offer-module/offer-module.module";
import {OfferServicesService} from "../../Core/Services/OfferServices/offer-services.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent {
  offers: OfferModuleModule[] = [];
  userId: number =0 ;
  constructor(private offerService: OfferServicesService , private route : ActivatedRoute) { }

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
