import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ViewusersComponent } from './Components/viewusers/viewusers.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import {AuthGuard} from "./guards/auth.guard";
import {ViewProfileComponent} from "./Components/view-profile/view-profile.component";

const routes: Routes = [

  { path: 'addUser', component: AddUserComponent, canActivate : [AuthGuard], data : {roles :['Admin']} },
  { path: 'ViewUsers', component: ViewusersComponent , canActivate : [AuthGuard], data : {roles :['Admin']}},
  { path: 'edit-user/:id', component: EditUserComponent , canActivate : [AuthGuard], data : {roles :['Admin']} },
  { path: 'ViewProfile', component: ViewProfileComponent, canActivate : [AuthGuard], data : {roles :['Admin']} },
  { path: '**', component: HomeComponent },
 // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
