import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.component.html',
  styleUrls: ['./addrequest.component.css']
})
export class AddrequestComponent {
  myForm: FormGroup;
  request: any;

  // requests: Request[] | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private snackBar: MatSnackBar, private router: Router) {
    this.myForm = this.formBuilder.group({
      requestTitle: ['', [Validators.required, Validators.minLength(5)]],
      requestContent: ['', [Validators.required, Validators.minLength(15)]],
      location: ['', Validators.required],
      cv: ['', Validators.required],
      requestField: ['',]
    });
  }
  onSubmit() {
    // Handle form submission here
    const formData = this.myForm?.value;

    // Check if formData is defined before proceeding
    if (formData) {
      formData.postingDate = new Date();
      formData.requestField = formData.requestField.join(',');
      console.log('Form Data:', formData);

      // Make an HTTP POST request to your backend endpoint
      this.http.post('http://localhost:8089/ForumManagement/request/add-request', formData)
        .subscribe(response => {
          console.log('Response from server:', response);
          // You can handle the response from the server here
          this.showSuccessSnackbar();
        });
    } else {
      console.error('Form data is undefined.');
    }
  }

  showSuccessSnackbar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Request added successfully!', 'X', {
      duration: 4000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

    // Subscribe to the afterDismissed observable
    snackBarRef.afterDismissed().subscribe(() => {
      // Redirect to the requests page after the snackbar is dismissed
      this.router.navigate(['/requests']);
    });
  }

  
}
 
 



