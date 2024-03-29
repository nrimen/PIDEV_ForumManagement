import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StandServiceService} from "../../Core/Services/StandServices/stand-service.service";
import {PackEnum} from "../../Core/Modules/Stand-Module/stand/pack.enum";
import {Stand} from "../../Core/Modules/Stand-Module/stand/stand";
import {
  OpenStandsCardDialogComponent
} from "../AdminStand/CreateStand/open-stands-card-dialog/open-stands-card-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EventServiceService} from "../../Core/Services/EventServices/event-service.service";
import {Event} from "../../Core/Modules/Event-Model/event/event";
import {StandDetailsComponent} from "./stand-details/stand-details.component";
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-reserver-stand',
  templateUrl: './reserver-stand.component.html',
  styleUrls: ['./reserver-stand.component.css']
})
export class ReserverStandComponent implements OnInit{
  isLinear = false;
  PackEnum = PackEnum;
  selectedStand: Stand | null = null;
  stands: Stand[] = [];
  createdEvent: Event | null = null;
  selectedSeatIds: number[] = [];


  constructor(private _dialog: MatDialog,
              private _formBuilder: FormBuilder,
              private standService: StandServiceService,
              private eventService: EventServiceService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.eventService.getEventsList().subscribe(
      (existingEvent) => {
        if (existingEvent) {
          console.log('Existing event found:', existingEvent);
          this.createdEvent = existingEvent[0];
        } else {
          console.log('No existing event found');
        }
      },
      (error) => {
        console.error('Error fetching existing event:', error);
      }
    );
    this.loadStands();

  }

  loadStands() {
    this.standService.getStandsList().subscribe(
      (stands: any[]) => {
        this.stands = stands;

      },
      (error) => {
        console.error('Error loading stands:', error);
      }
    );
  }
  getRows(pack: PackEnum  ): any[] {
    const stands = this.stands.filter(stand => stand.pack === pack);
    const totalStandsCount = stands.length;
    let seatsPerRow: number;
    const rowsArray = [];

    switch (pack) {
      case PackEnum.SILVER:
        seatsPerRow = 2;
        break;
      case PackEnum.GOLD:
      case PackEnum.UNPAYED:
      case PackEnum.DIAMOND:
        seatsPerRow = Math.min(8, totalStandsCount); // Limit to 8 seats per row or the total stands count, whichever is smaller
        break;
      default:
        seatsPerRow = 0; // Handle default case
    }

    const numberOfRows = Math.ceil(totalStandsCount / seatsPerRow);

    for (let i = 0; i < numberOfRows; i++) {
      const row = stands.slice(i * seatsPerRow, (i + 1) * seatsPerRow);
      rowsArray.push(row);
    }

    return rowsArray;
  }

  handleSeatClick(stand: Stand) {
    this.selectedStand = stand;
    this.openStandDetailsDialog(stand);
  }

  openStandDetailsDialog(stand: Stand) {
    console.log('Stand object:', stand);
    if (stand && stand.idStand !== undefined) {
      // Call the stand service to get stand with photos
      this.standService.getStandImages(stand.idStand).subscribe(
        (imageNames: string[]) => {
          // Combine the stand object and the image names into a single object
          const data = { stand: stand, imageNames: imageNames };
          // Open the dialog with the retrieved data
          this._dialog.open(StandDetailsComponent, {
            width: '50%',
            data: data // Pass the combined data to the dialog
          });
        },
        (error) => {
          console.error('Error fetching stand with photos:', error);
        }
      );
    } else {
      console.error('Invalid stand or stand ID is undefined:', stand);
    }
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const seat of this.selectedSeats) {
      totalPrice += seat.price;
    }
    return totalPrice;
  }




  hoveredStand: string | null = null;

  showIndicator(standId: string) {
    this.hoveredStand = standId;
  }

  hideIndicator(standId: string) {
    this.hoveredStand = null;
  }

  selectedSeats: Stand[] = [];

  handleSeatClick2(seat: Stand) {
    const index = this.selectedSeats.findIndex(selectedSeat => selectedSeat.idStand === seat.idStand);
    if (index !== -1) {
      // Deselect seat if already selected
      this.selectedSeats.splice(index, 1);
    } else {
      // Select seat if not already selected
      this.selectedSeats.push(seat);
    }
  }

  seatSelected(seat: Stand): boolean {
    return this.selectedSeats.some(selectedSeat => selectedSeat.idStand === seat.idStand);
  }

  toggleSeatSelection(seat: Stand) {
    const index = this.selectedSeats.findIndex(selectedSeat => selectedSeat.idStand === seat.idStand);
    if (index !== -1) {
      this.selectedSeats.splice(index, 1); // Deselect seat if already selected
    } else {
      this.selectedSeats.push(seat); // Select seat if not already selected
    }
  }







}
