import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Stand} from "../../../../Core/Modules/Stand-Module/stand/stand";
import { StandServiceService } from '../../../../Core/Services/StandServices/stand-service.service';
import {take} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-createmodal',
  templateUrl: './createmodal.component.html',
  styleUrls: ['./createmodal.component.css']
})
export class CreatemodalComponent implements OnInit {

  standForm!: FormGroup;

  galleryFiles: File[] = [];

  priceMap: { [key: string]: number } = {
    DIAMOND: 3000,
    GOLD: 2000,
    SILVER: 1000,
    UNPAYED: 0
  };

  constructor(private formBuilder: FormBuilder,
              private standService: StandServiceService ,
              private dialogRef: MatDialogRef<CreatemodalComponent>) {
  }

  nextID: number = 1;

  ngOnInit(): void {
    this.initStandForm();
  }

  initStandForm() {
    // Fetch the last ID from the existing stands table
    this.standService.getStandsList().pipe(take(1)).subscribe((stands: Stand[]) => {
      const lastStand = stands[stands.length - 1];
      if (lastStand?.idStand !== undefined) {
        this.nextID = lastStand.idStand + 1;
      }

      this.standForm = this.formBuilder.group({
        pack: ['', Validators.required],
        price: ['', Validators.required],
        gallery: [''],
        immatriculationStand: [`stand${this.nextID}`]
      });

      this.standForm.get('pack')?.valueChanges.subscribe(pack => {
        this.standForm.get('price')?.setValue(this.priceMap[pack]);
        const immatriculation = `stand${pack.toUpperCase()}${this.nextID}`;
        this.standForm.get('immatriculationStand')?.setValue(immatriculation);
      });
    });
  }


  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (this.galleryFiles.length < 4) {
          // Store the file itself in the array
          this.galleryFiles.push(files[i]);
        } else {
          alert('You can upload a maximum of 4 images.');
          break;
        }
      }
    }
  }


  onSubmit() {
    if (this.standForm.valid) {
      let stand = this.standForm.value;
      console.log('Form is valid. Stand data:', stand);
      this.standService.createStand(stand).subscribe(
        (createdStand:Stand) => {
          console.log('Stand data saved successfully');
          this.standService.notifyStandDataUpdated(createdStand); // Notify subscribers that stand data is updated with the created stand object
          this.dialogRef.close();
          },
        (error) => {
          console.error('Error saving stand data:', error);
        }
      );
    } else {
      console.error('Form is invalid');
      // Log the validation status of each form control
      console.log('Form validity status:', this.standForm.status);

      // Log the errors associated with each form control
      Object.keys(this.standForm.controls).forEach(field => {
        const control = this.standForm.get(field);
        console.log('Validation errors for ' + field + ':', control?.errors);
      });
      this.standForm.markAllAsTouched();
    }
}
  resetForm() {
    // Reset the form
    this.standForm.reset();
  }

}
