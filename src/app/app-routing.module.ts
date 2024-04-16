import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ViewusersComponent } from './Components/viewusers/viewusers.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import {AuthGuard} from "./guards/auth.guard";
import {ViewProfileComponent} from "./Components/view-profile/view-profile.component";
import {AddOfferComponent} from "./Components/add-offer/add-offer.component";
import {MatchingComponent} from "./Components/matching/matching.component";
import {ViewOffersComponent} from "./Components/view-offers/view-offers.component";
import {AddFeedBackComponent} from "./Components/add-feed-back/add-feed-back.component";
import {ViewFeedBackComponent} from "./Components/view-feed-back/view-feed-back.component";
import {EditFeedBackComponent} from "./Components/edit-feed-back/edit-feed-back.component";
import {EditOfferComponent} from "./Components/edit-offer/edit-offer.component";
import {MapComponent} from "./Components/map/map.component";
import {ViewByLocationComponent} from "./Components/view-by-location/view-by-location.component";
import {FavComponent} from "./Components/fav/fav.component";

const routes: Routes = [

  { path: 'addUser', component: AddUserComponent, canActivate : [AuthGuard], data : {roles :['Admin']} },
  { path: 'ViewUsers', component: ViewusersComponent , canActivate : [AuthGuard], data : {roles :['Admin']}},
  { path: 'edit-user/:id', component: EditUserComponent , canActivate : [AuthGuard], data : {roles :['Admin']} },
  { path: 'ViewProfile', component: ViewProfileComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']} },
  {path:'addOffer',component:AddOfferComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']}},
  {path:'matching/:id',component:MatchingComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']}},
  {path:'viewOffers',component:ViewOffersComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']}},
  {path:'addFeedBack',component:AddFeedBackComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']}},
  {path:'viewFeedBack',component:ViewFeedBackComponent, canActivate : [AuthGuard], data : {roles :['Admin']}},
  {path:'edit-feedback/:id',component:EditFeedBackComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']}},
  {path:'edit-offer/:id',component:EditOfferComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']}},
  {path:'map',component:MapComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']}},
  { path: 'ViewOfferByLocation', component: ViewByLocationComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']} },
  {path : 'favOffers' , component : FavComponent, canActivate : [AuthGuard], data : {roles :['Professor', 'Supplier', 'Alumny', 'Student', 'Exposant']} } ,
  { path: '**', component: HomeComponent },
 // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
