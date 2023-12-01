import { Component } from '@angular/core';
import { User } from '../_.model/usermodel';
import { UserService } from '../_.services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../_.model/addressmodel';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  updateProfileMessage: string | undefined
  user: User = {
    userId: 0,
    name: '',
    email: '',
    phone: '',
    role: '',
    address: {
      addressId: 0,
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  };
  address : Address = {
    addressId: 0,
      street: '',
      city: '',
      state: '',
      pincode: ''
  }

  constructor(private userservice: UserService, private route: ActivatedRoute) { }


  ngOnInit() {
    let userId = this.route.snapshot.paramMap.get('userId');
    console.warn(userId);
    userId && this.userservice.getUser(userId).subscribe((data) => {
      console.warn(data);
      this.user = data;
    });
  }

  updateProfilepage(user: User) {
    ///console.warn(user);
    this.userservice.updateUser(user).subscribe((result)=>{
      console.warn(result);
      this.updateProfileMessage = "profile Updated";
    });
    setTimeout(()=>{this.updateProfileMessage = undefined},2000)
  }
}
