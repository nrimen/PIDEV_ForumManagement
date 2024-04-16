import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreatemodalComponent } from "../createmodal/createmodal.component";
import { StandServiceService } from '../../../../Core/Services/StandServices/stand-service.service';
import { DeleteConfirmationDialogComponentComponent } from "../delete-confirmation-dialog-component/delete-confirmation-dialog-component.component";
import { Stand } from "../../../../Core/Modules/Stand-Module/stand/stand";
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { OpenStandsCardDialogComponent } from "../open-stands-card-dialog/open-stands-card-dialog.component";
import { AddMultipleStandsDialogComponent } from "../add-multiple-stands-dialog/add-multiple-stands-dialog.component";

@Component({
  selector: 'app-create-stand',
  templateUrl: './create-stand.component.html',
  styleUrls: ['./create-stand.component.css']
})
export class CreateStandComponent implements OnInit, AfterViewInit {

  stands: Stand[] = [];
  filteredStands: any[] = [];
  selectedPack: string = '';
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['immatriculationStand', 'exponent', 'reservationDate', 'price', 'pack', 'reserved', 'finished', 'partner', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild for MatPaginator

  constructor(private _dialog: MatDialog, private standService: StandServiceService) {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredStands = this.stands.slice(startIndex, endIndex);
    this.dataSource.data = this.filteredStands;
  }

  applyFilter(value: string) {
    value = value.trim(); // Remove whitespace
    value = value.toLowerCase(); // Convert input to lowercase
    this.dataSource.filter = value; // Apply filter to dataSource
  }


  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreatemodalComponent);
  }

  delete(standId: number) {
    const dialogRef = this._dialog.open(DeleteConfirmationDialogComponentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.standService.deleteStand(standId).subscribe(
          () => {
            console.log('Stand deleted successfully');
            // Reload stands after deletion
            this.loadStandsWithUsers();
          },
          (error) => {
            console.error('Error deleting stand:', error);
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.loadStandsWithUsers();
    this.standService.standDataUpdated$.subscribe((updatedStand: Stand) => {
      this.loadStandsWithUsers();
    });
  }
  loadStandsWithUsers() {
    this.standService.getStandsListWithUsers().subscribe(
      (stands: any[]) => {
        this.stands = stands;
        this.filteredStands = [...this.stands];
        this.dataSource.data = this.filteredStands;
        this.paginator.firstPage();
      },
      (error) => {
        console.error('Error loading stands:', error);
      }
    );
  }


  filterStandsByPack(packType: string) {
    if (packType === 'All Packs') {
      this.filteredStands = [...this.stands];
    } else {
      this.filteredStands = this.stands.filter(stand => stand.pack === packType);
    }
    this.dataSource.data = this.filteredStands;
  }

  openConfirmationModal(stand: Stand): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '250px',
      data: { stand: stand }
    });
  }
  openStandsCardDialog(): void {
    this._dialog.open(OpenStandsCardDialogComponent, {
      width: '50%',
      panelClass: 'stands-card-dialog',
      data: { stands: this.filteredStands } // Pass the filtered stands data to the dialog
    });
  }
  openAddMultipleStandsDialog(): void {
    const dialogRef = this._dialog.open(AddMultipleStandsDialogComponent);

  }

}
