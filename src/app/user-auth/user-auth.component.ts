import { Component } from '@angular/core';
import { SignUp } from '../_.model/signupmodel';
import { UserService } from '../_.services/user.service';
import { LogIn } from '../_.model/loginmodel';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showlogin = false;
  isAuthError : string = "";
  constructor(private userservice: UserService) { }
  ngOnInit(){
    this.userservice.reloaduser();
  }

  signup(data: SignUp) {
    console.warn(data)
    data.role = "user";
    this.userservice.userSignup(data);
  }

  login(data : LogIn){
    data.role = "user";
    //console.warn(data);
    this.userservice.userLogin(data);
    this.userservice.invalidUserAuth.subscribe((result)=>{
      console.warn("apple", result);
      if(result){
        this.isAuthError = "Please enter valid user detail";
      }
    })
  }

  
  openlogin() {
    this.showlogin = true
  }

  opensignup() {
    this.showlogin = false
  }

}
