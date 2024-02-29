import { Component } from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})

export class ViewProfileComponent {
  public profile! : KeycloakProfile;

  constructor(public keycloakService : KeycloakService) {
  }

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(profile => {
      this.profile = profile;
    })
  }

}
