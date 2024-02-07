import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./Shared/Header/header.component";
import {FooterComponent} from "./Shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./Components/home/home.component";
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import { BoothReservationComponent } from './Components/booth-reservation/booth-reservation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    BoothReservationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
