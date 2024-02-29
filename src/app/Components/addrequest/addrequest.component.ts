import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.component.html',
  styleUrls: ['./addrequest.component.css']
})
export class AddrequestComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.myForm = this.formBuilder.group({
      requestTitle: ['', [Validators.required, Validators.minLength(5)]],
      requestContent: ['', [Validators.required, Validators.minLength(15)]],
      location: ['', Validators.required],
      cv: ['', Validators.required],
      requestField: [ [] ], // Initialize as an array
      otherField: [''], // Add new FormControl for the "Other" input
    });
  }

onSubmit() {
  const formData = this.myForm?.value;

  if (formData) {
    formData.postingDate = new Date();

    // Add the "Other" field value to the requestField array
    if (formData.otherField) {
      formData.requestField.push(formData.otherField);
    }

    // Directly use the array as a comma-separated string
    formData.requestField = formData.requestField.join(',');

    this.http.post('http://localhost:8089/ForumManagement/request/add-request', formData)
      .subscribe(response => {
        console.log('Response from server:', response);
        this.showSuccessSnackbar();
      });
  } else {
    console.error('Form data is undefined.');
  }
}

  

  showOtherField: boolean = false;
  toggleOtherField(): void {
    this.showOtherField = !this.showOtherField;

    // If hiding the field, clear its value
    if (!this.showOtherField) {
      this.myForm.get('otherField')!.setValue('');
    }
  }

  showSuccessSnackbar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Request added successfully!', 'X', {
      duration: 4000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/requests']);
    });
  }
}
