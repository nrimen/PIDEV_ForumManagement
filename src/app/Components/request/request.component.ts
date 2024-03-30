import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

    requests:any;
    p: number=1;
    itemsPerPage: number=6;
    totalRequests:any;
  constructor(private http: HttpClient) {

  }
//--------FETCH----------//
  ngOnInit() {
    let response = this.http.get<Request[]>("http://localhost:8089/ForumManagement/request/retrieve-all-requests");
  response.subscribe((data) => {
    this.requests = data;
    this.totalRequests = data.length;
    this.filteredRequests = this.requests; 
    console.log('Requests data:', data);
  });
  }

  /* ta3mel split lel values mta3 l field */
  transformRequestField(request: any): string[] {
    if (request && request.requestField) {
      return request.requestField.split(',').map((value: string) => value.trim());
    }
    return [];
  }
  
  filteredRequests: any;
  showSearch: boolean = true;

 applyFilter(event: KeyboardEvent) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filteredRequests = this.requests.filter((request: any) =>
    request.requestTitle.toLowerCase().includes(filterValue.toLowerCase()) ||
    this.transformRequestField(request).some((field: any) => field.toLowerCase().includes(filterValue.toLowerCase()))
  );
}

  



}
