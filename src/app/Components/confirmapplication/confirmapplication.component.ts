import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmapplication',
  templateUrl: './confirmapplication.component.html',
  styleUrls: ['./confirmapplication.component.css']
})
export class ConfirmapplicationComponent {
  editForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ConfirmapplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      acceptance: [data.acceptance, Validators.required],
      discussion: [data.discussion, Validators.required],
    });
  }

  saveChanges() {
    this.dialogRef.close(this.editForm.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
