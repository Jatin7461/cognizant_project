import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { error, log } from 'node:console';
import { NavigateService } from '../navigate.service';
import { Router } from '@angular/router';
import { EditEventService } from '../edit-event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {

  @Input() eventName: any = '';
  @Input() location: any = '';
  @Input() date: any = '';
  @Input() startTime: any = '';
  @Input() endTime: any = '';
  @Input() seats: any = '';
  @Input() eventId: any = '';
  @Input() showJoinButton: boolean = false;
  @Input() eventJoined: boolean = false;
  @Input() showRemoveButton: boolean = false;
  @Input() showEditButton: boolean = false;


  constructor(private dataService: DataService, private navigateService: NavigateService, private router: Router, private editEventService: EditEventService) { }
  ngOnInit(): void {

    console.log('eventId', this.eventId)
    console.log('eventName', this.eventName)

  }

  editEvent(id: string) {
    this.navigateService.editEvent.set(true);
    this.editEventService.eventName.set(this.eventName);
    this.editEventService.eventLocation.set(this.location);
    this.editEventService.startTime.set(this.startTime);
    this.editEventService.endTime.set(this.endTime);
    this.editEventService.eventDate.set(this.date);
    this.editEventService.eventId.set(this.eventId);
    console.log("event name is ", this.eventName)
    this.router.navigate(['create-event'])

  }


  removeEventFromOrg(id: any) {

    this.dataService.deleteEventWithId(id).subscribe({
      next: (res) => {

        this.dataService.getEvents().subscribe({
          next: (res) => {


            let pastList: any = []
            let upcomingList: any = []
            let ongoingList: any = []
            let currDate = new Date().toISOString().slice(0, 10);
            console.log('pastoo', this.navigateService.pastEventsList());
            for (let event of res) {
              if (event.eventDate === currDate) {

                //get the status of the event 
                let status: string = this.navigateService.calculateTime(event);
                console.log(event.eventName, status)
                if (status === 'ongoing') {
                  ongoingList.push(event)
                }
                else if (status === 'past') {

                  pastList.push(event)
                }
                else {
                  upcomingList.push(event)
                }



              }
              else if (event.eventDate >= currDate) {
                upcomingList.push(event)
              }
              else {
                pastList.push(event)
              }

            }





            this.navigateService.pel = pastList
            this.navigateService.oel = ongoingList
            this.navigateService.uel = upcomingList


          },
          error: (err) => {

          }
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  removeEventFromUser(id: any) {
    this.dataService.getUserWithId(this.dataService.userId()).subscribe({
      next: (res) => {
        console.log(res);
        let eventIdList: string[] = res['events'];
        let index = eventIdList.findIndex((eventId: string) => { return eventId === id })
        console.log(id);
        console.log(eventIdList);
        console.log('index', index);
        eventIdList.splice(index, 1);
        res['events'] = eventIdList;

        this.dataService.updateUserWithId(this.dataService.userId(), res).subscribe({
          next: (res) => {
            let i = this.dataService.userEvents().findIndex((event: any) => {
              return id === event.id;
            })
            console.log('i', i);
            this.dataService.userEvents().splice(i, 1);

          }
          ,
          error: (err) => {

          }
        })

      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  removeEvent(id: any) {

    if (this.navigateService.signUpAs() === 'Organization') {
      this.removeEventFromOrg(id);
    }
    else {
      this.removeEventFromUser(id);
    }


  }

  joinEvent(id: string) {



    console.log(id);

    console.log(this.dataService.userId())
    let userId = this.dataService.userId();
    this.dataService.getUserWithId(userId).subscribe({
      next: (res) => {
        console.log('res', res)
        let arrWithEventIds = res['events'];
        console.log('arr with event ids', arrWithEventIds)
        let eventExists = arrWithEventIds.find((eventId: any) => {
          return eventId === id;
        })

        if (eventExists) {
          console.log('not moving forward')
          return;
        }



        arrWithEventIds.push(id);

        this.dataService.updateUserWithId(userId, res).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        })


        let eventIdList = res['events'];

        console.log(res);
        console.log(eventIdList);
        let eventsArr: any = [];
        for (let event of this.dataService.OrgEvents()) {
          for (let eve of eventIdList) {
            if (eve == event['id']) {
              eventsArr.push(event);
            }
          }
        }
        console.log('executing')
        this.dataService.userEvents.set(eventsArr);
      },
      error: (err) => {
        console.log(err);

      }
    })

  }



}
