import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  @Input() eventName: any = '';
  @Input() location: any = '';
  @Input() date: any = '';
  @Input() startTime: any = '';
  @Input() endTime: any = '';
  @Input() seats: any = '';
  @Input() eventId: any = '';
  @Input() showJoinButton: boolean = false;
  @Input() eventJoined: boolean = false;


  constructor(private dataService: DataService) { }

  joinEvent(id: string) {
    //   console.log('user id ',id);
    //   let arr:any = this.dataService.userEventsWithIdOnly();
    //   let eventArr:any = this.dataService.userEvents();
    //   console.log('initial array',arr)
    //   let eventExists = arr.find((eve:any)=>{
    //     return eve===id;
    //   })
    //   if(eventExists) return;

    //   let event = this.dataService.OrgEvents().find((eve)=>{
    //     console.log(eve['id'],id,eve['id']===id)
    //     return eve['id']===id

    //   });
    //   // console.log('found event',event);
    //   // console.log('Org events',this.dataService.OrgEvents());
    //   arr.push(id);
    //   eventArr.push(event);
    //   console.log('array after inserting id',id)
    //   this.dataService.userEventsWithIdOnly.set(arr);
    //   this.dataService.userEvents.set(eventArr);
    //   console.log(this.dataService.userId());

    //   this.dataService.getUserWithId(this.dataService.userId()).subscribe({
    //     next:(res)=>{
    //       console.log('user is ',res);
    //       res['events']=arr;
    //       console.log('updated user',res);
    //       this.dataService.updateUserWithId(this.dataService.userId(),res).subscribe({
    //         next:(res)=>{
    //           console.log(res);
    //         },
    //         error:(err)=>{
    //           console.log(err);
    //         }
    //       });
    //     },
    //     error:(err)=>{
    //       console.log(err);
    //     }
    //   })


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
