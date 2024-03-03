import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {NotFoundComponent} from "./Shared/not-found/not-found.component";
import {AddOfferComponent} from "./Components/add-offer/add-offer.component";
import {ViewOffersComponent} from "./Components/view-offers/view-offers.component";
import {AddFeedBackComponent} from "./Components/add-feed-back/add-feed-back.component";
import {ViewFeedBackComponent} from "./Components/view-feed-back/view-feed-back.component";
import {EditFeedBackComponent} from "./Components/edit-feed-back/edit-feed-back.component";
import {EditOfferComponent} from "./Components/edit-offer/edit-offer.component";
import {MatchingComponent} from "./Components/matching/matching.component";

const r: Routes = [

  {path:'home',component:HomeComponent},
  {path:'addOffer',component:AddOfferComponent},
  {path:'matching/:id',component:MatchingComponent},
  {path:'viewOffers',component:ViewOffersComponent},
  {path:'addFeedBack',component:AddFeedBackComponent},
  {path:'viewFeedBack',component:ViewFeedBackComponent},
  {path:'edit-feedback/:id',component:EditFeedBackComponent},
  {path:'edit-offer/:id',component:EditOfferComponent},
  {path:'**',component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(r)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
