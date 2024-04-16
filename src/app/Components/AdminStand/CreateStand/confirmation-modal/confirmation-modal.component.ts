import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {StandServiceService} from "../../../../Core/Services/StandServices/stand-service.service";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private standService: StandServiceService,

  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    // Update the isFinished attribute of the stand
    this.data.stand.finished = true;
    // Call the stand service to update the stand in the database
    this.standService.updateStand(this.data.stand.id,this.data.stand).subscribe(() => {
      // Close the dialog after successful update

      this.dialogRef.close('confirm');
    });
    console.log(this.data.stand);
  }

}
