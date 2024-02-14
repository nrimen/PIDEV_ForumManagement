import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {NotFoundComponent} from "./Shared/not-found/not-found.component";
import {CreateStandComponent} from "./Components/AdminStand/CreateStand/create-stand/create-stand.component";


const r: Routes = [

  {path:'home',component:HomeComponent},
  {path:'stand',component:CreateStandComponent},

  {path:'**',component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(r)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
