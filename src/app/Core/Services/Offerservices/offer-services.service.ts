 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OfferModuleModule} from "../../Modules/offer-module/offer-module.module";
import {FavOffersModule} from "../../Modules/fav-offers/fav-offers.module";

 @Injectable({
  providedIn: 'root'
})
export class OfferServicesService {
  private baseUrl = ' http://localhost:8089/ForumManagement/offer';

  constructor(private http: HttpClient) { }

   getOffers(): Observable<OfferModuleModule[]> {
    return this.http.get<OfferModuleModule[]>(`${this.baseUrl}/retrieve-all-offers`);
  }

  getOffer(id: number): Observable<OfferModuleModule> {
    console.log("appel back")
    return this.http.get<OfferModuleModule>(`${this.baseUrl}/retrieve-offer/${id}`);
  }

  addOffer(offer: OfferModuleModule): Observable<OfferModuleModule> {
    return this.http.post<OfferModuleModule>(`${this.baseUrl}/add-offer`, offer);
  }

  removeOffer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-offer/${id}`);
  }

  modifyOffer(offer: OfferModuleModule): Observable<OfferModuleModule> {
    return this.http.put<OfferModuleModule>(`${this.baseUrl}/modify-offer`, offer);
  }
  getMatchedOffersForUser(userId: number): Observable<OfferModuleModule[]> {
    return this.http.get<OfferModuleModule[]>(`${this.baseUrl}/match/${userId}`);
  }

  addOffersFromExcel(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getOfferCountsByLocation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countByLocation`);
  }

  getOffersByLocation(location: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/offersByLocation?location=${location}`);
  }

   addToFav(Favoffer: OfferModuleModule): Observable<FavOffersModule> {
     return this.http.post<FavOffersModule>(`${this.baseUrl}/addTofav`, Favoffer);
   }

   getFavOffers(): Observable<FavOffersModule[]> {
     return this.http.get<FavOffersModule[]>(`${this.baseUrl}/getFavOffers`);
   }

   removeFavOffer(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/removeFavOffers/${id}`);
   }

}
