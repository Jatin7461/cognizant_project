import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(private navigateService:NavigateService,private dataService:DataService,private router:Router){}
  ngOnInit(): void {
    this.signUpAs = this.navigateService.signUpAs
    this.signUpFlag = this.navigateService.signUpFlag
    
  }

  SignUpDetails = new FormGroup({
    "name": new FormControl(''),
    "email": new FormControl(''),
    "pass": new FormControl(''),
  })


  userSignUpDetails = new FormGroup({
    FirstName:new FormControl(''),
    LastName:new FormControl(''),
    email:new FormControl(''),
    pass:new FormControl(''),
  })

  signUpAs = signal('')
  signUpFlag = signal(true);
  placeholder = signal('')

  changeSignUpAs(){
    this.navigateService.changeSignUpAs();
  }

  onSignUp(){

    let userEvents:any = []
    let {name,email,pass} = this.SignUpDetails.value;
    console.log(this.SignUpDetails.value);
    if(this.signUpAs()==='Organization'){
      this.dataService.addOrganization({name,email,pass}).subscribe({
        next:(res)=>{
          console.log(res);
          this.router.navigate(['login']);
        }
      });
    }
    else{
      this.dataService.addUser({name,email,pass,"events":userEvents}).subscribe();

    }
  }
// 7382929985
}
