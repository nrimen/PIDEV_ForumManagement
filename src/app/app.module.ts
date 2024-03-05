import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./Shared/Header/header.component";
import {FooterComponent} from "./Shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./Components/home/home.component";
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import { BlogComponent } from './Components/blog/blog.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AddBlogComponent } from './Components/add-blog/add-blog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import { RoomlistComponent } from './Components/roomlist/roomlist.component';
import { AddroomComponent } from './Components/addroom/addroom.component';
import { ChatroomComponent } from './Components/chatroom/chatroom.component';
//import { ChatComponent } from './Components/chat/chat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    BlogComponent,
    BlogDetailsComponent,
    ContactComponent,
    //ChatComponent,
    AddBlogComponent,
    LoginComponent,
    RoomlistComponent,
    AddroomComponent,
    ChatroomComponent

    
    

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
