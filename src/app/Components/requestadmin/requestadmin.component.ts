import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestadmin',
  templateUrl: './requestadmin.component.html',
  styleUrls: ['./requestadmin.component.css']
})
export class RequestadminComponent {

  requests:any;
  dialog: any;
  constructor(private http: HttpClient,private snackBar: MatSnackBar, private router: Router) {

  }
//--------FETCH----------//
  ngOnInit() {
    let response = this.http.get<Request[]>("http://localhost:8089/ForumManagement/request/retrieve-all-requests");
  response.subscribe((data) => {
    this.requests = data;
    console.log('Requests data:', data);
  });
  }

  deleteRequest(requestId: number): void {
    // Customize the confirmation message
    const confirmationMessage = `Are you sure you want to delete this request with ID ${requestId}?`;
  
    // Open a custom confirmation snackbar
    const snackBarRef = this.snackBar.open(confirmationMessage, 'Yes', {
      duration: 0, // Snackbar will stay open until manually dismissed
      panelClass: ['snackbar-confirm'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  
    // Subscribe to the afterDismissed observable
    snackBarRef.afterDismissed().subscribe((dismissedAction: any) => {
      if (dismissedAction.dismissedByAction === true) {
        // User confirmed, proceed with delete
        console.log('Delete request with ID:', requestId);
  
        // Assuming you have a 'delete' endpoint with the correct path
        let deleteEndpoint = `http://localhost:8089/ForumManagement/request/remove-request/${requestId}`;
  
        // Send an HTTP request to the 'delete' endpoint
        this.http.delete(deleteEndpoint).subscribe(() => {
          console.log('Request deleted successfully');
  
          // Show success snackbar
          this.showSuccessSnackbar();
  
          // After deleting, refresh the requests
          this.ngOnInit();
        }, error => {
          console.error('Error deleting request:', error);
        });
      } else {
        // User clicked "No" or closed the snackbar
        console.log('Deletion canceled.');
      }
    });
  }
  
  showSuccessSnackbar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Request deleted successfully!', 'X', {
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
  

}
