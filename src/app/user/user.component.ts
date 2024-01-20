import { Component, inject, OnInit, signal } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {



  userEvents: any = signal([])
  OrgEvents = signal([])

  yourEvents = false;
  upcomingEvents = false;

  dataService = inject(DataService)

  ngOnInit(): void {
    this.userEvents = this.dataService.userEvents
    this.OrgEvents = this.dataService.OrgEvents;
    // this.dataService.getEvents().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     console.log(this.dataService.userEvents());

    //     let eventArr:any = []
    //     for(let event of res){
    //       for(let userEvent of this.dataService.userEvents()){
    //         if(event.id===userEvent) eventArr.push(event);
    //       }
    //     }

    //     this.OrgEvents = res;
    //     this.dataService.OrgEvents.set(res);



    //     this.userEvents.set(eventArr);
    //     console.log(this.userEvents)


    //   },
    //   error: (err) => {
    //     console.log(err);

    //   }
    // })


    // this.dataService.getEvents().subscribe({
    //   next: (res) => {

    //     let arr: any = []
    //     for (let event of res) {
    //       for (let userEvent of this.dataService.userEventsWithIdOnly()) {
    //         if (userEvent === event['id'])
    //           arr.push(event);
    //       }
    //     }
    //     console.log('res is ', res);
    //     this.dataService.OrgEvents.set(res);
    //     this.OrgEvents = (res);


    //     this.dataService.userEvents.set(arr);

    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })



    this.dataService.getUserWithId(this.dataService.userId()).subscribe({
      next: (res) => {

        console.log('res after joining',res)

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

        this.userEvents.set(eventsArr);
        console.log('userevent array in user component is ',this.userEvents())

      },
      error: (err) => {
        console.log('error', err)
      }
    })
  }


  onYourEvents() {
    this.yourEvents = true;
    this.upcomingEvents = false;
  }

  onUpcomingEvents() {

    this.yourEvents = false;
    this.upcomingEvents = true

  }

}
