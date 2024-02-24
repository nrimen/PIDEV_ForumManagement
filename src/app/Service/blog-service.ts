import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../Core/Models/blog';
import { createClient } from '@supabase/supabase-js'



const supabaseUrl = 'https://gdvrodbdggjncgbhmooj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdnJvZGJkZ2dqbmNnYmhtb29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1NzA2MTUsImV4cCI6MjAwOTE0NjYxNX0.bY6nuW09os-Y8P2oBLlIDh9pDOIu0TspJ7owLlNqVw4' 
export const supabase = createClient(supabaseUrl, supabaseKey)
  // { bucket: 'your-bucket-name' })

  const URL = "http://localhost:8089/ForumManagement/blog/" ;
@Injectable({
  providedIn: 'root'
})


export class blogService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  addArticle(Blog: Blog) : Observable<any>{
    return this.http.post(URL + "addB", Blog).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
}





getArticles(): Observable<Blog[]> {
  return this.http.get<Blog[]>(URL + "afficheB").pipe(
    tap(() => {
      this._refresh$.next();
    })
  )
}

getArticleById(id: number): Observable<Blog> {
  return this.http.get<Blog>(URL + `afficheB/${id}`).pipe(
    tap(() => {
      this._refresh$.next();
    })
  )
}



deleteArticle(idBlog: number): Observable<void> {
  return this.http.delete<void>(URL + `deleteB/${idBlog}`).pipe(
    tap(() => {
      this._refresh$.next();
    })
  )
}
}



