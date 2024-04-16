import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Application } from 'src/app/Core/Models/Application';


@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  form: FormGroup<any>;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    // Initialize the form in the constructor
    this.form = this.fb.group({
      notes: ['', [Validators.required, Validators.minLength(10)]],
      applicationCV: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Any additional initialization can be done here
  }

  onSubmit() {
    const formData = this.form?.value;

    if (formData) {

      const applicationData: Application = {
        discussion: false, // Assuming these properties are not user-inputted
        accepted: false, // and should be set based on business logic
        applicationCV: this.form.get('applicationCV')?.value,
        notes: this.form.get('notes')?.value,
        
      };

      this.http.post('http://localhost:8089/ForumManagement/application/add-application', applicationData)
      .subscribe(response => {
        console.log('Response from server:', response);
        this.showSuccessSnackbar();
      });
  } else {
    console.error('Form data is undefined.');
  }
  }

  showSuccessSnackbar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Application sent with succes!', 'X', {
      duration: 4000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/applications']);
    });
  }



}
