import { Event } from "../../Core/Modules/Event-Model/event/event";
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { EventServiceService } from '../../Core/Services/EventServices/event-service.service';
import { Subscription, interval } from 'rxjs';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  event: Event | undefined;
  daysLeft: number = 0;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;
  private countdownSubscription: Subscription | undefined;
  private mySwiper: Swiper | undefined;

  constructor(private eventService: EventServiceService) {}

  ngOnInit() {
    this.eventService.getEventsList().subscribe(
      (events: Event[]) => {
        console.log('Events:', events);
        if (events && events.length > 0 && events[0].debutDate) {
          const eventDate = new Date(events[0].debutDate);
          this.updateCountdown(eventDate);
          this.startCountdownUpdateInterval(eventDate);
          this.event = events[0]; // Assign the first event to the event property
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

  ngAfterViewInit() {
    this.initSwiper();
  }

  ngOnDestroy() {
    this.stopCountdownUpdateInterval();
    this.destroySwiper();
  }

  initSwiper() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  destroySwiper() {
    if (this.mySwiper) {
      this.mySwiper.destroy();
    }
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
