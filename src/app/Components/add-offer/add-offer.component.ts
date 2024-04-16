import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfferServicesService} from "../../Core/Services/OfferServices/offer-services.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  offerForm!: FormGroup;
  selectedFile!: File;

  constructor(private fb: FormBuilder, private offerService: OfferServicesService , private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      offerTitle: ['', Validators.required],
      postingDate: ['', Validators.required],
      closingDate: ['', Validators.required],
      location: ['', Validators.required],
      employementType: ['', Validators.required], // Champ de sélection du type d'emploi
      offerStatus: ['', Validators.required],
      offerDescription: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.offerForm.valid) {
      let offerData = this.offerForm.value;
      this.offerService.addOffer(offerData).subscribe(
        response => {
          console.log('Offer created with success:', response);
          this.offerForm.reset();
          this.router.navigate(['/viewOffers']);
        },
        error => {
          console.error('ERROR:', error);
        }
      );
    } else {
      console.error('Form invalid');
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  addOffersFromExcel() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.offerService.addOffersFromExcel(formData).subscribe(
      response => {
        console.log('Offers added from Excel with success:', response);
        this.snackBar.open('Offers added by Excel with success', 'Close', {
          duration: 10000, // Durée de la notification en millisecondes
          verticalPosition: 'top' // Position de la notification sur l'écran
        });
        this.router.navigate(['/viewOffers']);
      },
      error => {
        console.error('ERROR:', error);
      }
    );
  }
}
