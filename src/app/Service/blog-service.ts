import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../Core/Models/blog';



const URL = "http://localhost:8089/ForumManagement/blog/" ;
@Injectable({
  providedIn: 'root'
})


export class blogService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  addArticle(Blog: Blog) {
    return this.http.post<Blog>(URL + "addB", Blog).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
}
}
