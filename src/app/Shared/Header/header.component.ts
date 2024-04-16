import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import {ViewProfileComponent} from "../../Components/view-profile/view-profile.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink , NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public profile! : KeycloakProfile;
  constructor(public keycloakService : KeycloakService,public dialog: MatDialog) {
  }
  openUserProfileDialog(): void {
    const dialogRef = this.dialog.open(ViewProfileComponent, {
      width: '500px', // Largeur de la boîte de dialogue
      data: { profile: this.profile } // Passer les données de profil utilisateur à la boîte de dialogue
    });
  }

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then(profile => {
        this.profile = profile;
      });
    }
  }

  async handleLogin() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

  handleLogout(){
    this.keycloakService.logout(window.location.origin);
  }
}
