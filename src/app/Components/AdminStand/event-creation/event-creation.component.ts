import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventServiceService } from "../../../Core/Services/EventServices/event-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Event} from "../../../Core/Modules/Event-Model/event/event";

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit{
  eventForm: FormGroup;
  createdEvent: Event | null = null;
  eventExists: boolean = false; // Flag to check if an event exists

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private eventService: EventServiceService) {
    this.eventForm = this.fb.group({
      debutDate: [null, Validators.required],
      lastDate: [null, Validators.required],
      location: [null],
      description: [null]
    });
  }

  ngOnInit() {
    // Initialize createdEvent with existing event data
    this.eventService.getEventsList().subscribe(
      (existingEvent) => {
        if (existingEvent) {
          console.log('Existing event found:', existingEvent);
          this.createdEvent = existingEvent[0];
        } else {
          console.log('No existing event found');
        }
      },
      (error) => {
        console.error('Error fetching existing event:', error);
      }
    );
  }

  onSubmit() {
    if (this.eventForm.valid) {
      // Check if an event already exists before attempting to create a new one
      this.eventService.getEventsList().subscribe(
        (events) => {
          if (events.length > 0) {
            this.showErrorSnackBar('An event already exists in the database.');
            return;
          } else {
            // If no event exists, proceed with creating a new one
            const eventData = {
              debutDate: this.eventForm.get('debutDate')?.value,
              lastDate: this.eventForm.get('lastDate')?.value,
              location: this.eventForm.get('location')?.value,
              description: this.eventForm.get('description')?.value
            };

            console.log('Event data:', eventData);

            // Call your event service to create the event
            this.eventService.createEvent(eventData).subscribe(
              (createdEvent) => {
                console.log('Event created successfully:', createdEvent);
                this.createdEvent = createdEvent; // Store the created event
                this.eventForm.reset(); // Reset the form
                this.showSuccessSnackBar('Event created successfully');
                // Optionally, navigate to a different page or show a success message
              },
              (error) => {
                console.error('Error creating event:', error);
                this.showErrorSnackBar('Error creating event. Please try again.');
                // Optionally, display an error message to the user
              }
            );
          }
        },
        (error) => {
          console.error('Error retrieving events:', error);
          this.showErrorSnackBar('Error retrieving events. Please try again.');
        }
      );
    } else {
      console.error('Form is invalid');
      this.showErrorSnackBar('Form is invalid. Please check your inputs.');
      // Optionally, display an error message to the user or handle invalid form data
    }
  }
  event(){
    this.eventService.getEventsList()
  }
  checkExistingEvent() {
    // Call your event service to get the existing event
    this.eventService.getEventsList().subscribe(
      (existingEvents) => {
        if (existingEvents && existingEvents.length > 0) {
          console.log('Existing event found:', existingEvents[0]);
          this.createdEvent = existingEvents[0]; // Assuming only one event is returned

            this.eventService.deleteEvent(this.createdEvent.idEvent).subscribe(
              () => {
                console.log('Event deleted successfully');
                this.showSuccessSnackBar('Event deleted successfully');
                this.createdEvent = null;

              },
              (error) => {
                console.error('Error deleting event:', error);
                this.showErrorSnackBar('Error deleting event');
              }
            );
          } else {
            console.error('No existing event to delete');
          }
        }


    );
  }


  onDeleteExistingEvent() {

  }



  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
      panelClass: ['error-snackbar']
    });
  }

}

