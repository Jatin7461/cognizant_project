import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DataService } from '../data.service';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit, OnDestroy {



  showPastEvents = signal(false);
  showUpcomingEvents = signal(false);
  showOngoingEvents = signal(false);


  //lists of events
  pastEventsList: any = []
  upcomingEventsList: any = []
  ongoingEventsList: any = []

  constructor(private navigateService: NavigateService, private dataService: DataService) { }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.navigateService.pastEventsList = [];
    this.navigateService.ongoingEventsList = [];
    this.navigateService.upcomingEventsList = [];
    console.log('on destroy called')
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.pastEventsList = []
    this.upcomingEventsList = []
    this.ongoingEventsList = []

    this.showPastEvents = this.navigateService.showPastEvents
    this.showUpcomingEvents = this.navigateService.showUpcomingEvents
    this.showOngoingEvents = this.navigateService.showOngoingEvents

    //arrange all events in their respective lists
    this.dataService.getEvents().subscribe({
      next: (res) => {
        console.log(res);
        let currDate = new Date().toISOString().slice(0, 10);

        for (let event of res) {
          // console.log(event);
          if (event.eventDate === currDate) {

            //get the status of the event 
            let status: string = this.calculateTime(event);
            console.log(event.eventName, status)
            if (status === 'ongoing') {
              this.navigateService.ongoingEventsList.push(event);
            }
            else if (status === 'past') {

              this.navigateService.pastEventsList.push(event);
            }
            else {
              this.navigateService.upcomingEventsList.push(event);
            }



          }
          else if (event.eventDate >= currDate) {
            this.navigateService.upcomingEventsList.push(event);
          }
          else {
            this.navigateService.pastEventsList.push(event)
          }

        }

        console.log('past events', this.navigateService.pastEventsList);

        console.log('upcoming events', this.navigateService.upcomingEventsList);
        console.log('ongoing events', this.navigateService.ongoingEventsList);

        this.pastEventsList = this.navigateService.pastEventsList
        this.upcomingEventsList = this.navigateService.upcomingEventsList
        this.ongoingEventsList = this.navigateService.ongoingEventsList

      },
      error: (err) => {
        console.log(err);
      }
    })


  }




  calculateTime(event: any): string {


    let currDate = new Date();
    let currHour = currDate.getHours();
    let currMin = currDate.getMinutes().toString();
    let start = event.startTime.replace(':', '');
    let end = event.endTime.replace(':', '');

    let currTime = currHour + currMin

    if (currTime.length == 3) {
      currTime = "0" + currTime
    }
    else if (currTime.length == 2)
      currTime = "00" + currTime
    else if (currTime.length == 1)
      currTime = "000" + currTime
    else if (currTime.length == 0)
      currTime = "0000"

    
    console.log('times', currTime, start, end);
    if (currTime <= end && currTime >= start)
      return 'ongoing'
    if (currTime > end) {
      return 'past';
    }
    else return 'upcoming'





  }


}
