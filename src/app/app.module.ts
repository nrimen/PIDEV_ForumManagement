import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./Shared/Header/header.component";
import { FooterComponent } from "./Shared/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationComponent } from './Components/application/application.component';
import { RequestComponent } from './Components/request/request.component';
import { AddrequestComponent } from './Components/addrequest/addrequest.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RequestadminComponent } from './Components/requestadmin/requestadmin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmapplicationComponent } from './Components/confirmapplication/confirmapplication.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ApplicationComponent,
    RequestComponent,
    AddrequestComponent,
    RequestadminComponent,
    ConfirmapplicationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HeaderComponent,
    HttpClientModule,
    FooterComponent,
    RouterOutlet,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [ 
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
