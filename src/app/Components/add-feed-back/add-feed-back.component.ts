import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FeedBackServicesService} from "../../Core/Services/FeedBackServices/feed-back-services.service";

@Component({
  selector: 'app-add-feed-back',
  templateUrl: './add-feed-back.component.html',
  styleUrls: ['./add-feed-back.component.css']
})
export class AddFeedBackComponent {
  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder, private feedbackService: FeedBackServicesService) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      submitedDate: ['', Validators.required],
      feedBackContent: ['', Validators.required],
      rating: ['', Validators.required],
      feedBackType: ['', Validators.required],
      priority: ['', Validators.required],

    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      let feedbackData = this.feedbackForm.value;
      this.feedbackService.addFeedback(feedbackData).subscribe(
        response => {
          console.log('Feedback created successfully:', response);
          this.feedbackForm.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Form invalid');
    }
  }
}
