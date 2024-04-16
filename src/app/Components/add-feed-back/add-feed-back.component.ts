import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FeedBackServicesService} from "../../Core/Services/FeedBackServices/feed-back-services.service";
import {MatDialog} from "@angular/material/dialog";
import {AssistanceDialogComponent} from "../assistance-dialog/assistance-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-feed-back',
  templateUrl: './add-feed-back.component.html',
  styleUrls: ['./add-feed-back.component.css']
})
export class AddFeedBackComponent {
  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder, private feedbackService: FeedBackServicesService , private dialog: MatDialog, private router: Router) { }

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
          this.router.navigate(['/viewFeedBack']);
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Form invalid');
    }
  }

  openAssistanceDialog(): void {
    const dialogRef = this.dialog.open(AssistanceDialogComponent, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // Assurez-vous que result n'est pas vide et qu'il contient le contenu généré
      if (result && result.trim() !== '') {
        this.feedbackForm.patchValue({
          feedBackContent: result
        });
      } else {
        // Gérer le cas où aucun contenu n'est généré ou où result est vide
        console.error("Aucun contenu n'a été généré pour feedbackContent.");
      }
    });
  }
}
