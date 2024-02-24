import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {NotFoundComponent} from "./Shared/not-found/not-found.component";
import { BlogComponent } from './Components/blog/blog.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { ContactComponent } from './Components/contact/contact.component';
import { ChatComponent } from './Components/chat/chat.component';
import { AddBlogComponent } from './Components/add-blog/add-blog.component';


const r: Routes = [

  {path:'blog',component:BlogComponent},
  {path:'home',component:HomeComponent},
  {path:'blog-details/:id',component:BlogDetailsComponent},
  {path:'addblog',component:AddBlogComponent},
  {path:'chat',component:ChatComponent},
  {path:'contact',component:ContactComponent},
  {path:'',redirectTo:"home",pathMatch:'full'},
  {path:'**',component:NotFoundComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(r)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
