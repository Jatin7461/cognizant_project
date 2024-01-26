import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  orgNameRequired: boolean = false;
  emailRequired: boolean = false;
  passwordRequired: boolean = false;
  passMatch: boolean = false;

  userNameRequired: boolean = false;
  userEmailRequired: boolean = false;
  userPassRequired: boolean = false;
  userPassConfirmRequired: boolean = false;

  constructor(private navigateService: NavigateService, private dataService: DataService, private router: Router) { }
  ngOnInit(): void {
    this.signUpAs = this.navigateService.signUpAs
    this.signUpFlag = this.navigateService.signUpFlag

  }

  SignUpDetails = new FormGroup({
    "name": new FormControl('', Validators.required),
    "email": new FormControl(''),
    "pass": new FormControl(''),
    "confirmPass": new FormControl(''),
  })


  userSignUpDetails = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    pass: new FormControl(''),
    confirmPass: new FormControl('')
  })

  signUpAs = signal('')
  signUpFlag = signal(true);
  placeholder = signal('')

  changeSignUpAs() {
    this.navigateService.changeSignUpAs();
  }

  onSignUp() {

    let userEvents: any = []
    let { name, email, pass, confirmPass } = this.SignUpDetails.value;
    console.log(this.SignUpDetails.value);
    if (this.signUpAs() === 'Organization') {
      // this.dataService.addOrganization({ name, email, pass }).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     this.router.navigate(['login']);
      //   }
      // });

      this.signUpAsOrg({ name, email, pass, confirmPass });
    }
    else {
      // this.dataService.addUser({ name, email, pass, "events": userEvents }).subscribe();
      let { firstName, lastName, email, pass, confirmPass } = this.userSignUpDetails.value;
      this.signUpAsUser({ firstName, lastName, email, pass, confirmPass })

    }
  }


  goToSignIn() {
    this.router.navigate(['login']);
  }


  signUpAsOrg(org: any) {

    let { name, email, pass, confirmPass } = org;
    if (!name || !email || !pass || pass !== confirmPass) {

      if (!name) {
        this.orgNameRequired = true;
      }

      if (!email) {
        this.emailRequired = true;
      }

      if (!pass) {
        this.passwordRequired = true;
      }

      if (pass !== confirmPass) {
        this.passMatch = true;

      }

      return;
    }


    this.dataService.addOrganization({ name, email, pass }).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['login']);
      }
    });



  }


  signUpAsUser(user: any) {
    let { firstName, lastName, email, pass, confirmPass } = user;

    console.log(firstName, lastName, email, pass, confirmPass)
    console.log('verifying credentials')
    if (!firstName || !email || !pass || !confirmPass) {

      if (!firstName) {
        this.userNameRequired = true;
      }

      if (!email) {
        this.userEmailRequired = true;
      }

      if (!pass) {
        this.userPassRequired = true;
      }

      if (pass !== confirmPass) {
        this.userPassConfirmRequired = true;
      }

      console.log('nope');
      return;

    }




    this.dataService.addUser({ name: firstName + ' ' + lastName, email, pass, events: [] }).subscribe({
      next: (res) => {
        this.router.navigate(['login']);
      }
    });

  }

}
