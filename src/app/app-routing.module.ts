import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {NotFoundComponent} from "./Shared/not-found/not-found.component";
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

  {path:'blog',component:BlogComponent},
  {path:'home',component:HomeComponent},
  {path:'blog-details/:id',component:BlogDetailsComponent},
  {path:'addblog',component:AddBlogComponent},
  {path:'updateblog/:id',component:UpdateBlogComponent},
  //{path:'chat',component:ChatComponent},
  {path:'contact',component:ContactComponent},
  {path:'',redirectTo:"home",pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'chatroom/:roomname', component: ChatroomComponent },
  { path: 'roomlist', component: RoomlistComponent },
  { path: 'addroom', component: AddroomComponent },
  { path: 'chatroom/:nickname/:roomid', component: ChatroomComponent },
  { path: 'chatbot', component:ChatbotComponent},
  {path:'**',component:NotFoundComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(r)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
