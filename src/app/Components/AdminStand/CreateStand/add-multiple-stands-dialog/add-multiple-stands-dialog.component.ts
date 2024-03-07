import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Stand } from "../../../../Core/Modules/Stand-Module/stand/stand";
import { Observable, forkJoin } from "rxjs";
import { StandServiceService } from "../../../../Core/Services/StandServices/stand-service.service";
import { supabase } from "../../../../utils/supabase";
import { PackEnum } from "../../../../Core/Modules/Stand-Module/stand/pack.enum";

@Component({
  selector: 'app-add-multiple-stands-dialog',
  templateUrl: './add-multiple-stands-dialog.component.html',
  styleUrls: ['./add-multiple-stands-dialog.component.css']
})
export class AddMultipleStandsDialogComponent implements OnInit {
  standForm!: FormGroup;
  packOptions!: string[];
  packPrices: { [pack: string]: number } = {
    [PackEnum.DIAMOND]: 3000,
    [PackEnum.GOLD]: 2000,
    [PackEnum.SILVER]: 1000,
    [PackEnum.UNPAYED]: 0
  };

  nextID: number = 1;
  constructor(
    private standService: StandServiceService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMultipleStandsDialogComponent>
  ) { }

  ngOnInit(): void {
    this.packOptions = Object.values(PackEnum);
    this.standForm = this.fb.group({
      packType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: [''], // Price field
      photos: [''],
    });
    // Listen to changes in the pack type field and update the price field accordingly
    this.standForm.get('packType')?.valueChanges.subscribe(packType => {
      this.standForm.get('price')?.setValue(this.packPrices[packType]);
      const immatriculation = `stand${packType.toUpperCase()}${this.nextID}`;
      this.standForm.get('immatriculationStand')?.setValue(immatriculation);
    });
  }

  addMultipleStands(): void {
    const quantity = this.standForm.get('quantity')?.value;
    const packType = this.standForm.get('packType')?.value;
    const price = this.standForm.get('price')?.value;
    const gallery = this.standForm.get('photos')?.value;

    const standsToAdd: Stand[] = [];

    for (let i = 0; i < quantity; i++) {
      const idStand = this.nextID + i;
      const immatriculation = `stand${packType.toUpperCase()}${idStand}`;
      const stand: Stand = {
        finished: false,
        immatriculationStand: immatriculation,
        partner: false,
        reservationDate: null,
        reserved: false,
        userStand: null,
        pack: packType,
        price: price,
        gallery: gallery
      };
      standsToAdd.push(stand);
    }

    // Call the service to create multiple stands
    const observables: Observable<any>[] = standsToAdd.map(stand => this.standService.createStand(stand));

    forkJoin(observables).subscribe(
      (results) => {
        console.log('Stands added successfully:', results);
        this.dialogRef.close(); // Close the dialog after stands are added
      },
      (error) => {
        console.error('Error adding stands:', error);
      }
    );
  }

  async uploadFiles(files: FileList): Promise<string[]> {
    const uploadedPaths: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const { data, error } = await supabase.storage.from('images').upload(`${Date.now()}_${file.name}`, file, { cacheControl: '3600', upsert: false });
        if (error) {
          console.error(error);
        } else {
          uploadedPaths.push(data.path);
        }
      }
    }

    return uploadedPaths;
  }

  onPhotosSelected(event: any): void {
    const files = event.target.files;
    this.uploadFiles(files);
  }

}
