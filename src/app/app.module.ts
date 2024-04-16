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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RequestadminComponent } from './Components/requestadmin/requestadmin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmapplicationComponent } from './Components/confirmapplication/confirmapplication.component';
import { MatChipsModule } from '@angular/material/chips';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResumeComponent } from './resume/resume.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApplyComponent } from './Components/apply/apply.component';
import { EditrequestComponent } from './Components/editrequest/editrequest.component';
import { ZegocloudComponent } from './Components/zegocloud/zegocloud.component';
import { MakeinterviewComponent } from './Components/makeinterview/makeinterview.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ApplicationComponent,
    RequestComponent,
    AddrequestComponent,
    RequestadminComponent,
    ConfirmapplicationComponent,
    ResumeComponent,
    ApplyComponent,
    EditrequestComponent,
    ZegocloudComponent,
    MakeinterviewComponent,
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
    MatDialogModule,
    MatChipsModule,
    FormsModule,
    NgxPaginationModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule

  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
