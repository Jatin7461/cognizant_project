import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {



  constructor(private dataService: DataService,
    private router: Router,private navigateService:NavigateService) { }


  eventDetails = new FormGroup({
    eventName: new FormControl(''),
    eventDate: new FormControl(''),
    location: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    seats: new FormControl(''),
  })




  onCreateEvent() {
    let { eventName, eventDate, location, startTime, endTime, seats } = this.eventDetails.value
    this.dataService.addEvent({"company":this.navigateService.companyName(), eventName, eventDate, location, startTime, endTime, seats }).subscribe({
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
