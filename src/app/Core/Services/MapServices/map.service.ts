import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getCoordinatesForLocation(location: string): Observable<any> {
    const apiKey = 'AIzaSyDYCukBAHbPvhHzmPsDl1YHREiEaeXkzyQ';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
    return this.http.get(apiUrl);
  }
}
