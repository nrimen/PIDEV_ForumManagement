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
import {ReactiveFormsModule} from "@angular/forms";
import { ViewusersComponent } from './Components/viewusers/viewusers.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { ViewProfileComponent } from './Components/view-profile/view-profile.component';

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


  ],
  imports: [
    KeycloakAngularModule ,
    AppRoutingModule,
    BrowserModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    BrowserAnimationsModule,
    ReactiveFormsModule ,
    KeycloakAngularModule,
    HttpClientModule

  ],
  providers: [ {provide : APP_INITIALIZER, useFactory : initializeKeycloak, multi :true, deps : [KeycloakService]}],
  bootstrap: [AppComponent]
})
export class AppModule { }



