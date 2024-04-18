import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./Shared/Header/header.component";
import { FooterComponent } from "./Shared/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import { BlogComponent } from './Components/blog/blog.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AddBlogComponent } from './Components/add-blog/add-blog.component';
import { HttpClient } from '@angular/common/http';
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
import { StandDetailsComponent } from './Components/reserver-stand/stand-details/stand-details.component';
// import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { CarouselModule } from 'angular-bootstrap-md';
import { DatePipe } from '@angular/common';
import {RoomlistComponent} from "./Components/roomlist/roomlist.component";
import {ChatbotComponent} from "./Components/chatbot/chatbot.component";
import {LoginComponent} from "./Components/login/login.component";
import {AddroomComponent} from "./Components/addroom/addroom.component";
import {ChatroomComponent} from "./Components/chatroom/chatroom.component";
import {UpdateBlogComponent} from "./Components/update-blog/update-blog.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ApplicationComponent } from './Components/application/application.component';
import { RequestComponent } from './Components/request/request.component';
import { AddrequestComponent } from './Components/addrequest/addrequest.component';
import { FormBuilder } from '@angular/forms';
import { RequestadminComponent } from './Components/requestadmin/requestadmin.component';
import { ConfirmapplicationComponent } from './Components/confirmapplication/confirmapplication.component';
import { MatChipsModule } from '@angular/material/chips';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResumeComponent } from './resume/resume.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApplyComponent } from './Components/apply/apply.component';
import { EditrequestComponent } from './Components/editrequest/editrequest.component';
import { ZegocloudComponent } from './Components/zegocloud/zegocloud.component';
import { MakeinterviewComponent } from './Components/makeinterview/makeinterview.component';
import { AboutComponent } from './Components/about/about.component';



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
    StandDetailsComponent,
    BlogComponent,
    BlogDetailsComponent,
    ContactComponent,
    //ChatComponent,
    AddBlogComponent,
    LoginComponent,
    RoomlistComponent,
    AddroomComponent,
    ChatroomComponent,
    UpdateBlogComponent,
    ChatbotComponent,
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
    AboutComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HeaderComponent,
    HttpClientModule,
    FooterComponent,
    RouterOutlet,
    BrowserAnimationsModule,
   
    MatButtonModule,
  
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    
    MatGridListModule,
    
    OverlayModule,
    MatStepperModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatChipsModule,
    NgxPaginationModule

  ],
  providers: [DatePipe,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
