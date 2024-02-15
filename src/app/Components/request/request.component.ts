import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

    requests:any;
  constructor(private http: HttpClient) {

  }
//--------FETCH----------//
  ngOnInit() {
    let response = this.http.get<Request[]>("http://localhost:8089/ForumManagement/request/retrieve-all-requests");
  response.subscribe((data) => {
    this.requests = data;
    console.log('Requests data:', data);
  });
  }
  

}
