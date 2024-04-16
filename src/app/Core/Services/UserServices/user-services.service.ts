import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModuleModule} from "../../Modules/user-module/user-module.module";

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private baseUrl = 'http://localhost:8089/ForumManagement/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserModuleModule[]> {
    return this.http.get<UserModuleModule[]>(`${this.baseUrl}/retrieve-all-users`);
  }

  getUserById(userId: number): Observable<UserModuleModule> {
    return this.http.get<UserModuleModule>(`${this.baseUrl}/retrieve-user/${userId}`);
  }

  createUser(user: UserModuleModule): Observable<UserModuleModule> {
    return this.http.post<UserModuleModule>(`${this.baseUrl}/add-user`, user);
  }

  updateUser(user: UserModuleModule): Observable<UserModuleModule> {
    return this.http.put<UserModuleModule>(`${this.baseUrl}/modify-user`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-user/${userId}`);
  }
}
