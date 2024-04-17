import {Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Stand } from "../../../../Core/Modules/Stand-Module/stand/stand";
import { PackEnum } from "../../../../Core/Modules/Stand-Module/stand/pack.enum";
import {MatTooltip} from "@angular/material/tooltip";

interface DialogData {
  stands: Stand[];
}

interface PackConfiguration {
  [key: string]: { rows: number; seatsPerRow: number };
}

@Component({
  selector: 'app-open-stands-card-dialog',
  templateUrl: './open-stands-card-dialog.component.html',
  styleUrls: ['./open-stands-card-dialog.component.css']
})
export class OpenStandsCardDialogComponent implements OnInit {

  filteredStands: Stand[]; // assuming this is your filtered stands data
  packs = [PackEnum.SILVER, PackEnum.GOLD, PackEnum.DIAMOND, PackEnum.UNPAYED]; // list of pack enums
  PackEnum = PackEnum;

  constructor(
    public dialogRef: MatDialogRef<OpenStandsCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stands: Stand[] }
  ) {
    this.filteredStands = data.stands;
  }

  ngOnInit(): void {
    // this.filteredStands.forEach(stand => {
    //   console.log("Immatriculation:", this.getImmatriculation(stand));
    // });
  }



  getRows(pack: PackEnum): any[] {
    const stands = this.filteredStands.filter(stand => stand.pack === pack);
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

  getImmatriculation(stand: Stand): string {
    // Assuming stand has a property called immatriculation
    return stand.immatriculationStand;
  }



}

