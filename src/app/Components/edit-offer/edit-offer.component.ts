import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployementType, OfferModuleModule} from '../../Core/Modules/offer-module/offer-module.module';
import {OfferServicesService} from '../../Core/Services/OfferServices/offer-services.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  offerForm!: FormGroup;
  offer: OfferModuleModule = {
    offerTitle: '',
    postingDate: new Date(),
    closingDate: new Date(),
    location: '',
    employementType: EmployementType.FullTimeJob,
    offerStatus: '',
    offerDescription: ''
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferServicesService
  ) { }

  ngOnInit(): void {
    // Récupérer l'identifiant de l'offre depuis l'URL
    const offerId = this.route.snapshot.params['id'];

    // Récupérer les informations de l'offre à partir du service
    this.offerService.getOffer(offerId).subscribe(
      response => {
        this.offer = response; // Stockez les informations récupérées dans la propriété offer
        this.initializeForm(); // Initialisez le formulaire avec les informations de l'offre
      },
      error => {
        console.error('ERROR :', error);
      }
    );
  }

  initializeForm(): void {
    // Initialisez le formulaire avec les informations de l'offre
    this.offerForm = this.fb.group({
      offerTitle: [this.offer.offerTitle || '', Validators.required],
      postingDate: [this.offer.postingDate || '', Validators.required],
      closingDate: [this.offer.closingDate || '', Validators.required],
      location: [this.offer.location || '', Validators.required],
      employementType: [this.offer.employementType || '', Validators.required],
      offerStatus: [this.offer.offerStatus || '', Validators.required],
      offerDescription: [this.offer.offerDescription || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.offerForm.valid) {
      const offerData = this.offerForm.value;
      offerData.idOffer = this.offer.idOffer; // Assurez-vous d'inclure l'identifiant de l'offre dans les données à mettre à jour

      this.offerService.modifyOffer(offerData).subscribe(
        response => {
          console.log('Offer updated with success:', response);
          this.router.navigate(['/viewOffers']); // Redirigez vers la liste des offres après la mise à jour
        },
        error => {
          console.error('ERROR :', error);
        }
      );
    } else {
      console.error('FormInvalid');
    }
  }

}
