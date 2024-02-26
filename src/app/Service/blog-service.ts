import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../Core/Models/blog';






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



