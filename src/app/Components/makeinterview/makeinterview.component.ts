import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InterviewType } from 'src/app/Core/Models/InterviewType';

@Component({
  selector: 'app-makeinterview',
  templateUrl: './makeinterview.component.html',
  styleUrls: ['./makeinterview.component.css']
})
export class MakeinterviewComponent {
  addForm: FormGroup;
  InterviewType = InterviewType;
  isInPerson = false;

  constructor(
    private dialogRef: MatDialogRef<MakeinterviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      Type: [data.Title, Validators.required],
      Date: [data.Date, Validators.required],
      Class: [data.Class, Validators.required],
      Link: [data.Class, Validators.required],
    });
  }

  saveChanges() {
    this.dialogRef.close(this.addForm.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onInterviewTypeChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.isInPerson = selectedType === 'INPERSON';
  }
}
