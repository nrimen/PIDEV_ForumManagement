import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./Shared/Header/header.component";
import {FooterComponent} from "./Shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./Components/home/home.component";
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './Components/add-user/add-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewusersComponent } from './Components/viewusers/viewusers.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { ViewProfileComponent } from './Components/view-profile/view-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AddOfferComponent} from "./Components/add-offer/add-offer.component";
import {ViewOffersComponent} from "./Components/view-offers/view-offers.component";
import {EditOfferComponent} from "./Components/edit-offer/edit-offer.component";
import {AddFeedBackComponent} from "./Components/add-feed-back/add-feed-back.component";
import {ViewFeedBackComponent} from "./Components/view-feed-back/view-feed-back.component";
import {EditFeedBackComponent} from "./Components/edit-feed-back/edit-feed-back.component";
import {MatchingComponent} from "./Components/matching/matching.component";
import {MapComponent} from "./Components/map/map.component";
import {ViewByLocationComponent} from "./Components/view-by-location/view-by-location.component";
import {AssistanceDialogComponent} from "./Components/assistance-dialog/assistance-dialog.component";
import {FavComponent} from "./Components/fav/fav.component";
import {MatRadioModule} from "@angular/material/radio";
import { MatSnackBarModule } from '@angular/material/snack-bar';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'my-test-realm',
        clientId: 'my-webapp-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AddUserComponent,
    ViewusersComponent,
    EditUserComponent,
    ViewProfileComponent,
    AddOfferComponent,
    ViewOffersComponent,
    EditOfferComponent,
    AddFeedBackComponent,
    ViewFeedBackComponent,
    EditFeedBackComponent,
    MatchingComponent,
    MapComponent,
    ViewByLocationComponent,
    AssistanceDialogComponent,
    FavComponent,


  ],
  imports: [
    KeycloakAngularModule,
    AppRoutingModule,
    BrowserModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule ,
    MatSnackBarModule

  ],
  providers: [ {provide : APP_INITIALIZER, useFactory : initializeKeycloak, multi :true, deps : [KeycloakService]}],
  bootstrap: [AppComponent]
})
export class AppModule { }



