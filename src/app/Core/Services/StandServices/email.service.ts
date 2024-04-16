import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}

  sendEmailWithAttachment(userEmail: string, currencySheet: any) {
    const emailData = {
      to: userEmail,
      subject: 'Currency Sheet',
      body: 'Please find attached the currency sheet.',
      attachment: currencySheet  // Assuming currencySheet is a file or data to attach
    };

    return this.http.post<any>('http://your-api/send-email', emailData);
  }
}
