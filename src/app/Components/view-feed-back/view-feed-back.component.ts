import { Component } from '@angular/core';
import {FeedBackModuleModule} from "../../Core/Modules/feed-back-module/feed-back-module.module";
import {FeedBackServicesService} from "../../Core/Services/FeedBackServices/feed-back-services.service";

@Component({
  selector: 'app-view-feed-back',
  templateUrl: './view-feed-back.component.html',
  styleUrls: ['./view-feed-back.component.css']
})
export class ViewFeedBackComponent {
  feedbacks: FeedBackModuleModule[] = [];
  expandedFeedbacks: { [key: number]: boolean } = {};
  constructor(private feedbackService: FeedBackServicesService) { }

  ngOnInit(): void {
    this.loadFeedbacks(); // Chargement des feedbacks au démarrage du composant
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe(
      feedbacks => {
        this.feedbacks = feedbacks; // Assigner les feedbacks récupérés à la propriété feedbacks
      },
      error => {
        console.error('Erreur lors du chargement des feedbacks :', error);
      }
    );
  }

  deleteFeedback(feedback: FeedBackModuleModule) {
    if (feedback.idFeedBack !== undefined) {
      this.feedbackService.removeFeedback(feedback.idFeedBack).subscribe(
        () => {
          // Filtrer le feedback supprimé de la liste des feedbacks affichés
          this.feedbacks = this.feedbacks.filter(f => f !== feedback);
        },
        error => {
          console.error('Erreur lors de la suppression du feedback :', error);
        }
      );
    } else {
      console.error('L\'identifiant du feedback est indéfini.');
    }
  }

  toggleFeedbackContent(feedbackId: number | undefined): void {
    if (feedbackId !== undefined) {
      this.expandedFeedbacks[feedbackId] = !this.expandedFeedbacks[feedbackId];
    }  }
}
