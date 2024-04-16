import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Stand} from "../../../../Core/Modules/Stand-Module/stand/stand";
import { StandServiceService } from '../../../../Core/Services/StandServices/stand-service.service';
import {take} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {supabase} from "../../../../utils/supabase";

@Component({
  selector: 'app-createmodal',
  templateUrl: './createmodal.component.html',
  styleUrls: ['./createmodal.component.css']
})
export class CreatemodalComponent implements OnInit {

  @Input() mode: 'add' | 'update' | undefined;
  @Input() standData: Stand | undefined;
  private fileupload: File = {} as File;

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
    if (this.mode === 'update' && this.standData) {

    } else {
      this.initStandForm();
    }
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

  onFileChanged = (event: any) => {
    const files: FileList = event.target.files;
    const filenames: string[] = [];

    for (let i = 0; i < files.length; i++) {
      filenames.push(files[i].name);
    }

    this.galleryFiles = Array.from(files); // Save files for upload
    this.standForm.get('gallery')?.setValue(filenames); // Update form control with file names
  }

  async uploadFile(file: File): Promise<string | undefined> {
    const { data, error } = await supabase.storage.from('images').upload(`${Date.now()}_${file.name}`, file, { cacheControl: '3600', upsert: false });
    if (error) {
      console.error(error);
      return undefined;
    } else {
      return data.path;
    }
  }

  async onSubmit() {
    if (this.standForm.valid) {
      const galleryPaths = await Promise.all(this.galleryFiles.map(file => this.uploadFile(file)));

      if (galleryPaths.every(path => path)) {
        let stand = this.standForm.value;
        stand.gallery = galleryPaths; // Assign file paths to the gallery property

        console.log('Form is valid. Stand data:', stand);

        this.standService.createStand(stand).subscribe(
          (createdStand: Stand) => {
            console.log('Stand data saved successfully');
            this.standService.notifyStandDataUpdated(createdStand);
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error saving stand data:', error);
          }
        );
      } else {
        console.error('Error uploading gallery files');
      }
    } else {
      console.error('Form is invalid');
      console.log('Form validity status:', this.standForm.status);
      Object.keys(this.standForm.controls).forEach(field => {
        const control = this.standForm.get(field);
        console.log('Validation errors for ' + field + ':', control?.errors);
      });
      this.standForm.markAllAsTouched();
    }
  }


}
