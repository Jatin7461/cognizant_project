import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NavigateService } from '../navigate.service';
import { EditEventService } from '../edit-event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {



  editEvent = signal(false)
  eventName = signal('');

  constructor(private dataService: DataService,
    private router: Router, private navigateService: NavigateService, private editEventService: EditEventService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.editEvent = this.navigateService.editEvent
    this.eventName = this.editEventService.eventName
    // console.log('yooooo', this.eventName())
    console.log('edit event', this.editEvent())

    if (this.editEvent()) {
      console.log('event location', this.editEventService.eventLocation())
      this.eventDetails.setValue({
        eventName: this.eventName(),
        eventDate: this.editEventService.eventDate(),
        location: this.editEventService.eventLocation(),
        startTime: this.editEventService.startTime(),
        endTime: this.editEventService.endTime()
      })
    }
    this.editEvent = this.navigateService.editEvent;
  }


  eventDetails = new FormGroup({
    eventName: new FormControl(''),
    eventDate: new FormControl(''),
    location: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl('')
  })



  updateEvent() {
    let { eventName, eventDate, location, startTime, endTime } = this.eventDetails.value
    this.dataService.updateEvent(this.editEventService.eventId(), { "company": this.navigateService.companyName(), eventName, eventDate, location, startTime, endTime }).subscribe({
      next: (res) => {
        this.router.navigate(['company']);
      },
      error: (err) => {
        console.log('error in updating event', err);
      }
    });
  }



  onCreateEvent() {
    let { eventName, eventDate, location, startTime, endTime } = this.eventDetails.value
    this.dataService.addEvent({ "company": this.navigateService.companyName(), eventName, eventDate, location, startTime, endTime }).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['company'])
      },
      error: (err) => {
        console.log(err)
      }
    });


  }
}
