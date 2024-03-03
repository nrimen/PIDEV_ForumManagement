 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OfferModuleModule} from "../../Modules/offer-module/offer-module.module";


@Injectable({
  providedIn: 'root'
})
export class OfferServicesService {
  private baseUrl = ' http://localhost:7777/OfferManagement/offer';

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
 /* uploadExcelFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }*/
  addOffersFromExcel(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
