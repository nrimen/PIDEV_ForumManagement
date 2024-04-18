import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StandServiceService} from "../../Core/Services/StandServices/stand-service.service";
import {PackEnum} from "../../Core/Modules/Stand-Module/stand/pack.enum";
import {Stand} from "../../Core/Modules/Stand-Module/stand/stand";
import {MatDialog} from "@angular/material/dialog";
import {EventServiceService} from "../../Core/Services/EventServices/event-service.service";
import {Event} from "../../Core/Modules/Event-Model/event/event";
import {StandDetailsComponent} from "./stand-details/stand-details.component";
import { Renderer2 } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';
import { saveAs } from 'file-saver';
import * as qrcode from 'qrcode';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reserver-stand',
  templateUrl: './reserver-stand.component.html',
  styleUrls: ['./reserver-stand.component.css']
})
export class ReserverStandComponent implements OnInit{

  isLinear = false;
  PackEnum = PackEnum;
  // selectedStand: Stand | null = null;
  stands: Stand[] = [];
  createdEvent: Event | null = null;
  // selectedSeatIds: number[] = [];


  constructor(private _dialog: MatDialog,
              private _formBuilder: FormBuilder,
              private standService: StandServiceService,
              private eventService: EventServiceService,
              private renderer: Renderer2,
              private _snackBar: MatSnackBar,
              private router: Router) { }

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

  selectedSeats: Stand[] = [];

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

  assignUserToStands() {
    const userId = "AegAA"; // Assuming you have the user's ID
    const userName = "samar"; // Assuming you have the user's name

    if (userId !== undefined) {
      const assignments = [];

      for (const stand of this.selectedSeats) {
        const assignmentObservable = this.standService.assignStandToUser(stand.idStand, userId);
        assignments.push(assignmentObservable);
      }

      forkJoin(assignments).subscribe(
        (responses) => {
          console.log('Stands assigned to user successfully:', responses);
          this.generateQRCode(userName,this.calculateTotalPrice(),this.selectedSeats,'111');
          this.generatePDF(userName);
          this._snackBar.open('Stand reserved!', 'OK', {
            duration: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        (error) => {
          console.error('Error:', error);
          this._snackBar.open('Failed to assign stands to user', 'OK', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error('User ID is undefined.');
    }
  }


  async generatePDF(userName: string): Promise<void> {
    try {
      (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
      const logoBase64 ='data:image/png;base64,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';
      const qrCodeBase64 = await this.generateQRCode(userName,this.calculateTotalPrice(),this.selectedSeats,this.generateUniqueCode()); // Generate QR code base64 string
      const documentDefinition: any = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
          // { image: logoBase64, width: 100, margin: [0, 0, 20, 0] },
          // { image: qrCodeBase64, width: 100, alignment: 'right', margin: [0, 0, 0, 0] },
          {
            columns: [
              { image: logoBase64, width: 100, alignment: 'left' },
              { width: '*', text: '                    ' },
              { image: qrCodeBase64, width: 100, alignment: 'right' }
            ]
          },
          { text: 'Currency Report', style: 'header', alignment: 'center' },
          { text: 'Reserved By: ' + userName, style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: [
                ['Stand', 'Immatriculation', 'Pack', 'Price'],
                ...this.selectedSeats.map(seat => [seat.idStand, seat.immatriculationStand, seat.pack, seat.price])
              ],
              alignment: 'center', // Center the table
              layout: {
                fillColor: function (rowIndex: number, node: Content, columnIndex: number) {
                  return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                }
              }
            },
            layout: {
              defaultBorder: true,
              paddingTop: () => 10,
              paddingBottom: () => 10,
            },
            margin: [0, 10, 0, 10],
          },
          {
            columns: [
              { text: 'Total reserved stands : ' + this.selectedSeats.length, style: 'quote' },
              { text: 'Total Price: ' + this.calculateTotalPrice() + ' dt ', style: 'quote', alignment: 'right' }
            ],
            margin: [0, 20, 0, 0], // Adjust top margin
          },
          { text: 'Please show this PDF to the administration to finalize your reservation !!', alignment: 'center', margin: [0, 40, 0, 0] }

        ],
        styles: {
          header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
          subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
          quote: { fontSize: 14, margin: [0, 5, 0, 5] },
        },
        defaultStyle: {
          font: 'Roboto',
          color: '#333',
        }
      };

      // Generate and download the PDF
      const fileName = userName + '_reservation.pdf';
      pdfMake.createPdf(documentDefinition).download(fileName, () => {
        // This callback function will be called when the download is completed or failed
        console.log('Download completed:', fileName);
        // You can perform any additional actions here
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
  async generateQRCode(userName: string, totalPrice: number, reservedStands: Stand[], uniqueCode: string): Promise<string> {
    try {
      const qrDataString = `${userName}\nTotal Price: ${totalPrice} dt\nReserved Stands:\n${reservedStands.map(stand => `  - ${stand.idStand}: ${stand.immatriculationStand}, Pack: ${stand.pack}, Price: ${stand.price} dt`).join('\n')}\nUnique Code: ${uniqueCode}`;

      const qrOptions: qrcode.QRCodeToDataURLOptions = {
        errorCorrectionLevel: 'M',
        width: 256,
        color: { dark: '#000000', light: '#ffffff' }
      };

      // Generate QR code data URL
      const qrCodeDataURL = await qrcode.toDataURL(qrDataString, qrOptions);

      // Return the generated QR code data URL
      return qrCodeDataURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return ''; // Return empty string in case of error
    }
  }
   generateUniqueCode(): string {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
    const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string
    return `${timestamp}-${randomString}`;
  }
  // async generateQRCode(userName: string): Promise<string> {
  //   try {
  //     const qrOptions: qrcode.QRCodeToDataURLOptions = {
  //       errorCorrectionLevel: 'M',
  //       width: 256,
  //       color: { dark: '#000000', light: '#ffffff' }
  //     };
  //
  //     const qrCodeDataURL = await qrcode.toDataURL(JSON.stringify({ userName }), qrOptions);
  //     return qrCodeDataURL;
  //   } catch (error) {
  //     console.error('Error generating QR code:', error);
  //     return ''; // Return empty string in case of error
  //   }
  // }

}
