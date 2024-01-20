import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private router: Router, private dataService: DataService) { }




  showPastEvents = signal(true);
  showUpcomingEvents = signal(false);
  showOngoingEvents = signal(false);

  pastEventsList: any = []
  upcomingEventsList: any = []
  ongoingEventsList: any = []


  companyName = signal('');
  signInError = signal(false);

  signUpAs = signal("Organization")
  placeholder = signal('')

  signUpFlag = signal(true);

  changeSignUpAs() {
    if (this.signUpFlag()) {

      this.signUpAs.set("User")
      this.placeholder.set("User Name")
    }
    else {

      this.signUpAs.set("Organization")
    }

    this.signUpFlag.set(!this.signUpFlag());
  }


  onSignIn(email: any, pass: any) {
    if (this.signUpAs() === "Organization") {


      this.dataService.getOrgs(email).subscribe({
        next: (res) => {
          if (!res[0] || !email || !pass) {
            this.signInError.set(true);
          }
          else {

            this.companyName.set(res[0].name);
            this.signInError.set(false);
            this.router.navigate(['company']);
          }
        },
        error: (err) => {
          console.log(err)
        }


      })
    }
    else {

      this.dataService.getUsers(email).subscribe({
        next:(res)=>{
          if(res[0]&&email &&pass){
            this.dataService.userId.set(res[0].id);
            this.dataService.userEvents.set(res[0].events);

            // this.dataService.getEvents().subscribe({
            //   next:(res)=>{

            //   },
            //   error:(err)=>{
            //     console.log(err);
            //   }
            // })

            this.dataService.getEvents().subscribe({
              next: (res) => {

                let arr: any = []
                for (let event of res) {
                  for (let userEvent of this.dataService.userEventsWithIdOnly()) {
                    if (userEvent === event['id'])
                      arr.push(event);
                  }
                }
                console.log('res is ', res);
                this.dataService.OrgEvents.set(res);
                // this.OrgEvents = (res);


                this.dataService.userEvents.set(arr);
                this.router.navigate(['user']);
                this.signInError.set(false)

              },
              error: (err) => {
                console.log(err);
              }
            })

          }
          else{
            this.signInError.set(true)
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })

    }
  }


  validateCredentials() {

  }


  onPastEvents() {

    this.showPastEvents.set(true)
    this.showUpcomingEvents.set(false)
    this.showOngoingEvents.set(false)





  }

  onUpcomingEvents() {

    this.showUpcomingEvents.set(true)
    this.showPastEvents.set(false)
    this.showOngoingEvents.set(false)




  }

  onOngoingEvents() {
    this.showOngoingEvents.set(true)
    this.showPastEvents.set(false)
    this.showUpcomingEvents.set(false)



  }


}
