import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/Core/Models/Application';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmapplicationComponent } from '../confirmapplication/confirmapplication.component';
import { Interview } from 'src/app/Core/Models/Interview';
import { MakeinterviewComponent } from '../makeinterview/makeinterview.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applications:any;
  router: any;
  constructor(private http: HttpClient,private snackBar: MatSnackBar,private dialog: MatDialog) {

  }
//--------FETCH----------//
  ngOnInit() {
    let response = this.http.get<Application[]>("http://localhost:8089/ForumManagement/application/retrieve-all-applications");
  response.subscribe((data) => {
    this.applications = data;
    console.log('Applications data:', data);
  });
  }

  //--------EDIT----------//
  editApplication(application: Application): void {
    // Open a dialog to get new values
    const dialogRef = this.dialog.open(ConfirmapplicationComponent, {
      data: {
        acceptance: application.accepted,
        discussion: application.discussion
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // User confirmed, proceed with edit
        console.log('Edit application with ID:', application.idApplication);
  
        // Assuming you have an 'edit' endpoint
        let editEndpoint = `http://localhost:8089/ForumManagement/application/modify-application`;
  
        // Append the new values to the application object
        const updatedApplication = {
          ...application,
          accepted: result.acceptance, // Use the correct property name
          discussion: result.discussion
        };
  
        // Send an HTTP request to the 'edit' endpoint
        this.http.put(editEndpoint, updatedApplication).subscribe(() => {
          console.log('Application edited successfully');
  
          // Show success snackbar
          this.showSuccessSnackbar();
  
          // After editing, refresh the applications
          this.ngOnInit();
        }, error => {
          console.error('Error editing application:', error);
        });
      } else {
        // User clicked "Cancel" or closed the dialog
        console.log('Edit canceled.');
      }
    });
  }


  showSuccessSnackbar(message: string = 'Edit done successfully!'): void {
    const snackBarRef = this.snackBar.open(message, 'X', {
      duration: 4000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  
    // Subscribe to the afterDismissed observable
    snackBarRef.afterDismissed().subscribe(() => {
      // Redirect to the applications page after the snackbar is dismissed
      this.router.navigate(['/applications']);
    });
  }
   //--------EDIT----------//


  //--------DELETE----------//

  deleteApplication(applicationId: number): void {
    // Customize the confirmation message
    const confirmationMessage = `Are you sure you want to delete this application with ID ${applicationId}?`;
  
    // Ask for confirmation using browser-native dialog
    const isConfirmed = window.confirm(confirmationMessage);
  
    if (isConfirmed) {
      // User confirmed, proceed with delete
      console.log('Delete application with ID:', applicationId);
  
      // Assuming you have a 'delete' endpoint with the correct path
      let deleteEndpoint = `http://localhost:8089/ForumManagement/application/remove-application/${applicationId}`;
      
      // Send an HTTP request to the 'delete' endpoint
      this.http.delete(deleteEndpoint).subscribe(() => {
        console.log('Application deleted successfully');
        // After deleting, refresh the applications
        this.ngOnInit();
      }, error => {
        console.error('Error deleting application:', error);
      });
    }
  }
  

  showAddSuccessSnackbar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Interview Added successfully!', 'X', {
      duration: 4000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  
    // Subscribe to the afterDismissed observable
    snackBarRef.afterDismissed().subscribe(() => {
      // Redirect to the requests page after the snackbar is dismissed
      this.router.navigate(['/requestsadmin']);
    });
  }

  addInterview(interview : Interview): void {
    // Open a dialog to get new values
    const dialogRef = this.dialog.open(MakeinterviewComponent, {
      data: {
        Type: interview.interviewType,
        Date: interview.interviewDate,
         Class: interview.classRoom,
         Link: interview.link,
         //application: interview.idApplication
         // loc: request.location,

       }
     }
    );
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // User confirmed, proceed with edit
        
  
        // Assuming you have an 'edit' endpoint
        let addEndpoint = `http://localhost:8089/ForumManagement/interview/add-interview`;
  
        // Append the new values to the application object
        const addedInterview = {
          ...interview,
          interviewType: result.Type,
          interviewDate: result.Date,
          classRoom: result.Class,
          link: result.Link,
          applicationId: result.idApplication,

        
        };
  
        // Send an HTTP request to the 'edit' endpoint
        this.http.post(addEndpoint, addedInterview).subscribe(() => {
          console.log(result);
  
          // Show success snackbar
          this.showAddSuccessSnackbar();
  
          // After editing, refresh the applications
          this.ngOnInit();
        }, error => {
          console.error('Error adding interview:', error);
        });
      } else {
        // User clicked "Cancel" or closed the dialog
        console.log('Add Finished.');
      }
    });
  }
  }
  


