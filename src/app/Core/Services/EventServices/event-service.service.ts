import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Event} from "../../Modules/Event-Model/event/event";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  private eventDataSubject = new Subject<Event>();

  private baseURL = 'http://localhost:8089/ForumManagement/event/';
  constructor(private httpClient: HttpClient) { }

  eventDataUpdated$ = this.eventDataSubject.asObservable();

  notifyEventDataUpdated(event: Event) {
    this.eventDataSubject.next(event);
  }

  getEventsList(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.baseURL}retrieve-all-events`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(`${this.baseURL}add-event`, event);
  }

  getEventById(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`${this.baseURL}retrieve-event/${id}`);
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    return this.httpClient.put<Event>(`${this.baseURL}modify-event`, event);
  }

  deleteEvent(id: number | undefined): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}remove-event/${id}`);
  }
}
