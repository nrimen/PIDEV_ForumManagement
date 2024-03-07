import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {NotFoundComponent} from "./Shared/not-found/not-found.component";
import {CreateStandComponent} from "./Components/AdminStand/CreateStand/create-stand/create-stand.component";
import {ReserverStandComponent} from "./Components/reserver-stand/reserver-stand.component";
import {EventCreationComponent} from "./Components/AdminStand/event-creation/event-creation.component";


const r: Routes = [
  {path:'CreateEvent',component:EventCreationComponent},
  {path:'',component:HomeComponent},
  {path:'stand',component:CreateStandComponent},
  {path:'ReserverStand',component:ReserverStandComponent},
  {path:'**',component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(r)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
