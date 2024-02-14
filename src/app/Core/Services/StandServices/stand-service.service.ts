import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Stand } from '../../Modules/Stand-Module/stand/stand';

@Injectable({
  providedIn: 'root'
})
export class StandServiceService {

  private standDataSubject = new Subject<Stand>();

  private baseURL = 'http://localhost:8089/ForumManagement/stand/';
  constructor(private httpClient: HttpClient) { }

  standDataUpdated$ = this.standDataSubject.asObservable();
  notifyStandDataUpdated(stand: Stand) {
    this.standDataSubject.next(stand);
  }

  getStandsList(): Observable<Stand[]> {
    return this.httpClient.get<Stand[]>(`${this.baseURL}retrieve-all-stands`);
  }

  createStand(stand: Stand): Observable<Stand> {
    return this.httpClient.post<Stand>(`${this.baseURL}add-stand`, stand);
  }

  getStandById(id: number): Observable<Stand> {
    return this.httpClient.get<Stand>(`${this.baseURL}retrieve-stand/${id}`);
  }

  updateStand(id: number, stand: Stand): Observable<Stand> {
    return this.httpClient.put<Stand>(`${this.baseURL}modify-stand`, stand);
  }

  deleteStand(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}remove-stand/${id}`);
  }
}
