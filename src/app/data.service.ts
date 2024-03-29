import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  userId = signal('');
  userEvents = signal([]);
  userEventsWithIdOnly = signal([]);
  OrgEvents = signal([]);


  constructor(private httpClient: HttpClient) { }

  addUser(user: any) {
    console.log("user added", user);

    return this.httpClient.post("http://localhost:3000/users", user)
  }

  addOrganization(org: any) {
    console.log("org added", org);
    return this.httpClient.post("http://localhost:3000/organizations", org)
  }


  getOrgs(email: any) {
    return this.httpClient.get<any>("http://localhost:3000/organizations?email=" + email);
  }


  addEvent(event: any) {
    return this.httpClient.post("http://localhost:3000/events", event);
  }


  getEvents() {
    return this.httpClient.get<any>("http://localhost:3000/events");
  }

  getUsers(email: any) {
    let url = `http://localhost:3000/users?email=${email}`
    return this.httpClient.get<any>(url);
  }

  getUserWithId(id: any) {
    let url = `http://localhost:3000/users/${id}`;
    console.log('getting user with id', id, 'using the url', url)
    return this.httpClient.get<any>(url);
  }

  updateUserWithId(id: any, user: any) {
    let url = `http://localhost:3000/users/${id}`;

    return this.httpClient.put(url, user)

  }


  deleteEventWithId(id: string) {

    let url = `http://localhost:3000/events/${id}`;
    return this.httpClient.delete(url);

  }


  updateEvent(id: string, event: any) {

    let url = `http://localhost:3000/events/${id}`;
    console.log('updating event with url', url)
    return this.httpClient.put(url, event);

  }

}
