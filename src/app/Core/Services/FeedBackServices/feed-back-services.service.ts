import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedBackModuleModule } from "../../Modules/feed-back-module/feed-back-module.module";

@Injectable({
  providedIn: 'root'
})
export class FeedBackServicesService {
  private baseUrl = ' http://localhost:8089/ForumManagement/feedback';

  constructor(private http: HttpClient) { }

  getFeedbacks(): Observable<FeedBackModuleModule[]> {
    return this.http.get<FeedBackModuleModule[]>(`${this.baseUrl}/retrieve-all-feedbacks`);
  }

  getFeedback(id: number): Observable<FeedBackModuleModule> {
    return this.http.get<FeedBackModuleModule>(`${this.baseUrl}/retrieve-feedback/${id}`);
  }

  addFeedback(feedback: FeedBackModuleModule): Observable<FeedBackModuleModule> {
    return this.http.post<FeedBackModuleModule>(`${this.baseUrl}/add-feedback`, feedback);
  }

  removeFeedback(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-feedback/${id}`);
  }

  modifyFeedback(feedback: FeedBackModuleModule): Observable<FeedBackModuleModule> {
    return this.http.put<FeedBackModuleModule>(`${this.baseUrl}/modify-feedback`, feedback);
  }
}
