import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FeedBackModuleModule,
  FeedBackType,
  Priority
} from '../../Core/Modules/feed-back-module/feed-back-module.module';
import {FeedBackServicesService} from '../../Core/Services/FeedBackServices/feed-back-services.service';

@Component({
  selector: 'app-edit-feed-back',
  templateUrl: './edit-feed-back.component.html',
  styleUrls: ['./edit-feed-back.component.css']
})
export class EditFeedBackComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedback: FeedBackModuleModule = {
    submitedDate: new Date(),
    feedBackContent: '',
    rating: 0,
    feedBackType: FeedBackType.General_FeedBack ,
    priority: Priority.High
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedBackServicesService
  ) { }

  ngOnInit(): void {
    // Récupérer l'identifiant du feedback depuis l'URL
    const feedbackId = this.route.snapshot.params['id'];

    // Récupérer les informations du feedback à partir du service
    this.feedbackService.getFeedback(feedbackId).subscribe(
      response => {
        this.feedback = response; // Stockez les informations récupérées dans la propriété feedback
        this.initializeForm(); // Initialisez le formulaire avec les informations du feedback
      },
      error => {
        console.error('ERROR :', error);
      }
    );
  }

  initializeForm(): void {
    // Initialisez le formulaire avec les informations du feedback
    this.feedbackForm = this.fb.group({
      submitedDate: [this.feedback.submitedDate || '', Validators.required],
      feedBackContent: [this.feedback.feedBackContent || '', Validators.required],
      rating: [this.feedback.rating || '', Validators.required],
      feedBackType: [this.feedback.feedBackType || '', Validators.required],
      priority: [this.feedback.priority || '', Validators.required]
    });

  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedbackData = this.feedbackForm.value;
      feedbackData.idFeedBack = this.feedback.idFeedBack; // Assurez-vous d'inclure l'identifiant du feedback dans les données à mettre à jour

      this.feedbackService.modifyFeedback(feedbackData).subscribe(
        response => {
          console.log('Feedback updated with success:', response);

          this.router.navigate(['/viewFeedBack']); // Redirigez vers la liste des feedbacks après la mise à jour
        },
        error => {
          console.error('ERROR :', error);
        }
      );
    } else {
      console.error('FormInvalid');
    }
  }

}
