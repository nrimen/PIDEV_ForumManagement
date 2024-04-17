import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editrequest',
  templateUrl: './editrequest.component.html',
  styleUrls: ['./editrequest.component.css']
})
export class EditrequestComponent {
  editForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditrequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      Title: [data.Title, Validators.required],
      Cont: [data.Cont, Validators.required],
      Res: [data.Res, Validators.required],
      Field: [data.Field, Validators.required],
    });
  }

  saveChanges() {
    this.dialogRef.close(this.editForm.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
