import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Stand } from "../../../Core/Modules/Stand-Module/stand/stand";
import { StandServiceService } from "../../../Core/Services/StandServices/stand-service.service";

@Component({
  selector: 'app-stand-details',
  templateUrl: './stand-details.component.html',
  styleUrls: ['./stand-details.component.css']
})
export class StandDetailsComponent implements OnInit {

  stand!: Stand;
  imageUrls: string[] = [];
  currentSlide = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private standService: StandServiceService) { }

  ngOnInit(): void {
    if (this.data && this.data.stand && typeof this.data.stand.idStand === 'number') {
      this.stand = this.data.stand;
      const standId: number = this.stand.idStand!;
      this.fetchImages(standId);
    } else {
      console.error('Invalid data or stand ID is undefined:', this.data);
    }
  }

  fetchImages(standId: number): void {
    this.standService.getStandImages(standId).subscribe(
      (imageNames: string[]) => {
        this.imageUrls = imageNames.map(imageName => this.getImageUrl(imageName));
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  getImageUrl(imageName: string): string {
    return "https://gdvrodbdggjncgbhmooj.supabase.co/storage/v1/object/public/images/" + imageName;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide === 0) ? this.imageUrls.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide === this.imageUrls.length - 1) ? 0 : this.currentSlide + 1;
  }
}
