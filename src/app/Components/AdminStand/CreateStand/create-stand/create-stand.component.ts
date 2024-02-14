import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import {CreatemodalComponent} from "../createmodal/createmodal.component";
import { StandServiceService } from '../../../../Core/Services/StandServices/stand-service.service';
import {
  DeleteConfirmationDialogComponentComponent
} from "../delete-confirmation-dialog-component/delete-confirmation-dialog-component.component";
import {Stand} from "../../../../Core/Modules/Stand-Module/stand/stand";


@Component({
  selector: 'app-create-stand',
  templateUrl: './create-stand.component.html',
  styleUrls: ['./create-stand.component.css']
})
export class CreateStandComponent implements OnInit{

  stands: any[] = [];
  filteredStands: any[] = []; // New array to hold filtered stands
  selectedPack: string = ''; // Track selected pack type
  constructor(private _dialog: MatDialog ,     private standService: StandServiceService
  ) {
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
            this.loadStands();
          },
          (error) => {
            console.error('Error deleting stand:', error);
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.loadStands();
    this.standService.standDataUpdated$.subscribe((updatedStand: Stand) => {
      this.loadStands();
  })
  }
  loadStands() {
    this.standService.getStandsList().subscribe(
      (stands: any[]) => {
        this.stands = stands;
        this.filteredStands = [...this.stands];
      },
      (error) => {
        console.error('Error loading stands:', error);
      }
    );
  }
  filterStandsByPack(packType: string) {
    if (packType === 'All-Packs') {
      // If 'all' is selected, show all stands
      this.filteredStands = [...this.stands];
    } else {
      // Filter stands by selected pack type
      this.filteredStands = this.stands.filter(stand => stand.pack === packType);
    }
  }



}
