import {Component, Inject} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})

export class ViewProfileComponent {
  public profile! : KeycloakProfile;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { profile: KeycloakProfile },public dialogRef: MatDialogRef<ViewProfileComponent>) {
  }

  ngOnInit(): void {

  }
  closeDialog(): void {
    this.dialogRef.close();
  }



}
