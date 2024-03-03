import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient , HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import {HeaderComponent} from "./Shared/Header/header.component";
import {FooterComponent} from "./Shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./Components/home/home.component";
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import { AddOfferComponent } from './Components/add-offer/add-offer.component';
import { ViewOffersComponent } from './Components/view-offers/view-offers.component';
import { EditOfferComponent } from './Components/edit-offer/edit-offer.component';
import { AddFeedBackComponent } from './Components/add-feed-back/add-feed-back.component';
import { ViewFeedBackComponent } from './Components/view-feed-back/view-feed-back.component';
import { EditFeedBackComponent } from './Components/edit-feed-back/edit-feed-back.component';
import {MatIconModule} from "@angular/material/icon";
import { MatchingComponent } from './Components/matching/matching.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AddOfferComponent,
    ViewOffersComponent,
    EditOfferComponent,
    AddFeedBackComponent,
    ViewFeedBackComponent,
    EditFeedBackComponent,
    MatchingComponent,

  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HeaderComponent,
        FooterComponent,
        RouterOutlet,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule ,
      MatSnackBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
