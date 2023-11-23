import { Component } from '@angular/core';
import { SignUp } from '../_.model/signupmodel';
import { UserService } from '../_.services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showlogin = false;

  constructor(private userservice: UserService) { }
  signup(data: SignUp) {
    console.warn(data)
    data.role = "user";
    this.userservice.userSignup(data);
  }
}
