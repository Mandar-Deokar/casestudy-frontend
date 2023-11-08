import { Component } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';
// import { SignUp } from '../data-type';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private signupservice: SignupService,  private router : Router){}
  
  
  ngOnInit(): void{}

  signup(signUp: any):void{
    console.warn()
    this.signupservice.userSignup(signUp).subscribe(
      (response) => console.log(response)
      ,(error) => console.log(error)
      
    );
  }
}
