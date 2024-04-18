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
      Type: [data.Type, Validators.required],
      Date: [data.Date, Validators.required],
      Class: [data.Class],
      Link: [data.Link],
    });
  }

  saveChanges() {
    this.dialogRef.close(this.addForm.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }
isInPersonInterview(): boolean {
  const typeControl = this.addForm.get('Type');
  return typeControl ? typeControl.value === this.InterviewType.INPERSON : false;
}

isOnlineInterview(): boolean {
  const typeControl = this.addForm.get('Type');
  return typeControl ? typeControl.value === this.InterviewType.ONLINE : false;
}

 randomID(len:number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

ngOnInit() {
  const typeControl = this.addForm.get('Type');
  const linkControl = this.addForm.get('Link');

  if (!typeControl || !linkControl) {
    // Handle the case where form controls are null
    return;
  }

  typeControl.valueChanges.subscribe(() => {
    if (this.isOnlineInterview()) {
      const ID = this.randomID(5);
      const link = `http://localhost:4200/videocall?roomID=${ID}`;
      linkControl.setValue(link);
    } else {
      linkControl.setValue(null);
    }
  });
}
 
}
