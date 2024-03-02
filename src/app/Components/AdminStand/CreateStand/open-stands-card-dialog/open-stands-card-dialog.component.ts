import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Stand } from "../../../../Core/Modules/Stand-Module/stand/stand";
import { PackEnum } from "../../../../Core/Modules/Stand-Module/stand/pack.enum";

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

  // packConfiguration: PackConfiguration = {
  //   [PackEnum.SILVER]: { rows: 8, seatsPerRow: 2 },
  //   [PackEnum.GOLD]: { rows: 2, seatsPerRow: 8 },
  //   [PackEnum.DIAMOND]: { rows: 2, seatsPerRow: 8 },
  //   [PackEnum.UNPAYED]: { rows: 2, seatsPerRow: 8 }, // Adjust numbers as needed
  // };
  //
  // constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  //
  // ngOnInit() {
  //   this.data.stands.forEach((stand: Stand & { rows?: { seats: any[] }[] }) => {
  //     const config = this.packConfiguration[stand.pack];
  //     if (config) {
  //       stand.rows = Array.from({ length: config.rows }, () => ({
  //         seats: Array.from({ length: config.seatsPerRow }, () => ({}))
  //       }));
  //     }
  //   });
  // }
  filteredStands: Stand[]; // assuming this is your filtered stands data
  packs = [PackEnum.SILVER, PackEnum.GOLD, PackEnum.DIAMOND, PackEnum.UNPAYED]; // list of pack enums
  PackEnum = PackEnum;

  constructor(
    public dialogRef: MatDialogRef<OpenStandsCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stands: Stand[] }
  ) {
    this.filteredStands = data.stands;
  }

  ngOnInit(): void {}

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

  isTooltipVisible: boolean = false;
  tooltipText: string = '';

  showTooltip(event: MouseEvent) {
    this.isTooltipVisible = true;
    this.tooltipText = this.getTooltipText(event.target);
  }

  hideTooltip() {
    this.isTooltipVisible = false;
  }

  getTooltipText(seat: any): string {
    return 'Tooltip Text Here';
  }

  getStandContent(pack: PackEnum, row: any[], seat: any): string {
    const standsInPack = this.filteredStands.filter(stand => stand.pack === pack);
    const rowIndex = row.findIndex((r: any) => r === seat);
    const standIndex = rowIndex * 2 + seat; // Assuming each row has 2 seats
    return standsInPack[standIndex] ? 'X' : '';
  }

}

