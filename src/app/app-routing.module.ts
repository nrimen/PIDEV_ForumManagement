import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Components/home/home.component";
import { ApplicationComponent } from "./Components/application/application.component";
import { NotFoundComponent } from "./Shared/not-found/not-found.component";
import { RequestComponent } from './Components/request/request.component';
import { AddrequestComponent } from './Components/addrequest/addrequest.component';
import { RequestadminComponent } from './Components/requestadmin/requestadmin.component';
import { ResumeComponent } from './resume/resume.component';
import { ApplyComponent } from './Components/apply/apply.component';
import { ZegocloudComponent } from './Components/zegocloud/zegocloud.component';
import { CreateStandComponent } from "./Components/AdminStand/CreateStand/create-stand/create-stand.component";
import { ReserverStandComponent } from "./Components/reserver-stand/reserver-stand.component";
import { EventCreationComponent } from "./Components/AdminStand/event-creation/event-creation.component";
import { BlogComponent } from './Components/blog/blog.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AddBlogComponent } from './Components/add-blog/add-blog.component';
//import { ChatComponent } from './Components/chat/chat.component';
import { LoginComponent } from './Components/login/login.component';
import { RoomlistComponent } from './Components/roomlist/roomlist.component';
import { AddroomComponent } from './Components/addroom/addroom.component';
import { ChatroomComponent } from './Components/chatroom/chatroom.component';
import { UpdateBlogComponent } from './Components/update-blog/update-blog.component';
import { ChatbotComponent } from './Components/chatbot/chatbot.component';


const r: Routes = [
  { path: '', component: HomeComponent },
  { path: 'CreateEvent', component: EventCreationComponent },
  { path: 'stand', component: CreateStandComponent },
  { path: 'ReserverStand', component: ReserverStandComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog-details/:id', component: BlogDetailsComponent },
  { path: 'addblog', component: AddBlogComponent },
  { path: 'updateblog/:id', component: UpdateBlogComponent },
  //{path:'chat',component:ChatComponent},
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: "home", pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chatroom/:roomname', component: ChatroomComponent },
  { path: 'roomlist', component: RoomlistComponent },
  { path: 'addroom', component: AddroomComponent },
  { path: 'chatroom/:nickname/:roomid', component: ChatroomComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'applications', component: ApplicationComponent },
  { path: 'requests', component: RequestComponent },
  { path: 'requestsadmin', component: RequestadminComponent },
  { path: 'addrequest', component: AddrequestComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'apply', component: ApplyComponent },
  { path: 'videocall', component: ZegocloudComponent },

  { path: '**', component: NotFoundComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(r)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
