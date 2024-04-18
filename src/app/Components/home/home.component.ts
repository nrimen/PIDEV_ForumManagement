
import {Event} from "../../Core/Modules/Event-Model/event/event";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventServiceService } from '../../Core/Services/EventServices/event-service.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  event: Event | undefined;

  daysLeft: number = 0;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;
  private countdownSubscription: Subscription | undefined;

  constructor(private eventService: EventServiceService) {}

  ngOnInit() {
    this.eventService.getEventsList().subscribe(
      (events: Event[]) => {
        if (events && events.length > 0 && events[0].debutDate) {
          const eventDate = new Date(events[0].debutDate);
          this.updateCountdown(eventDate);
          this.startCountdownUpdateInterval(eventDate);
        } else {
          // Handle the case where events list is empty or debutDate is null
          console.error('Events list is empty or debutDate is null or undefined.');
        }
      },
      error => {
        console.error('Error fetching events list:', error);
      }
    );
  }

  ngOnDestroy() {
    this.stopCountdownUpdateInterval();
  }

  updateCountdown(eventDate: Date) {
    const currentDate = new Date();
    const timeDiff = eventDate.getTime() - currentDate.getTime();
    this.daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
    this.hoursLeft = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    this.minutesLeft = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
    this.secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
  }

  startCountdownUpdateInterval(eventDate: Date) {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.updateCountdown(eventDate);
    });
  }

  stopCountdownUpdateInterval() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
}
