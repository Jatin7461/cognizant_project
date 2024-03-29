import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private navigateService:NavigateService,private dataService:DataService,private router:Router){}

  onLogout(){
    this.navigateService.pastEventsList = ([])
    this.navigateService.upcomingEventsList = ([])
    this.navigateService.ongoingEventsList = ([])

    // userId = signal('');
    // userEvents = signal([]);
    // userEventsWithIdOnly = signal([]);
    // OrgEvents = signal([]);
    this.dataService.userId.set('')
    this.dataService.userEvents.set([])
    this.dataService.userEventsWithIdOnly.set([])
    this.dataService.OrgEvents.set([])
  }


  goHome(){
    this.router.navigate([''])
  }

}
