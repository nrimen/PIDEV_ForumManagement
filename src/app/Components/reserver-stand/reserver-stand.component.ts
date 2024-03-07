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

  constructor(private _dialog: MatDialog,private _formBuilder: FormBuilder, private standService: StandServiceService,private eventService: EventServiceService) { }

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
    this.openStandsDetailsDialog();
  }

  openStandsDetailsDialog(): void {
    this._dialog.open(OpenStandsCardDialogComponent, {
      width: '50%',
      panelClass: 'stands-card-dialog',
      data: { stands: this.selectedStand } // Pass the filtered stands data to the dialog
    });
  }
}
