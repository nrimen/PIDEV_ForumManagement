import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./Shared/Header/header.component";
import {FooterComponent} from "./Shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./Components/home/home.component";
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateStandComponent } from './Components/AdminStand/CreateStand/create-stand/create-stand.component';
import { CreatemodalComponent } from './Components/AdminStand/CreateStand/createmodal/createmodal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteConfirmationDialogComponentComponent } from './Components/AdminStand/CreateStand/delete-confirmation-dialog-component/delete-confirmation-dialog-component.component';
import {MatSelectModule} from "@angular/material/select";
import { ConfirmationModalComponent } from './Components/AdminStand/CreateStand/confirmation-modal/confirmation-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";
import { OpenStandsCardDialogComponent } from './Components/AdminStand/CreateStand/open-stands-card-dialog/open-stands-card-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {OverlayModule} from "@angular/cdk/overlay";
import { ReserverStandComponent } from './Components/reserver-stand/reserver-stand.component';
import {MatStepperModule} from "@angular/material/stepper";
import { AddMultipleStandsDialogComponent } from './Components/AdminStand/CreateStand/add-multiple-stands-dialog/add-multiple-stands-dialog.component';
import { EventCreationComponent } from './Components/AdminStand/event-creation/event-creation.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
// import { MdbModalModule } from 'mdb-angular-ui-kit/modal';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CreateStandComponent,
    CreatemodalComponent,
    DeleteConfirmationDialogComponentComponent,
    ConfirmationModalComponent,
    OpenStandsCardDialogComponent,
    ReserverStandComponent,
    AddMultipleStandsDialogComponent,
    EventCreationComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    MatTooltipModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    OverlayModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
