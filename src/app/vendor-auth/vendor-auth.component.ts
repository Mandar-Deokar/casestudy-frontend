import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../_.model/signupmodel';
import { VendorService } from '../_.services/vendor.service';
import { LogIn } from '../_.model/loginmodel';

@Component({
  selector: 'app-vendor-auth',
  templateUrl: './vendor-auth.component.html',
  styleUrls: ['./vendor-auth.component.css']
})
export class VendorAuthComponent {
  constructor(private vendorservice: VendorService,  private router : Router, ){}
  
  showlogin = true;
  authError : String = "";
  
  ngOnInit(): void{
    this.vendorservice.reloadvendor();
  }

  signup(data: SignUp):void{
    this.vendorservice.userSignup(data)
}

  openlogin() {
    this.showlogin = true
  }

  opensignup(){
    this.showlogin = false
  }
 
  login(data : LogIn):void{
    this.authError = ""; 
    console.warn(data);
    this.vendorservice.userLogin(data);
    this.vendorservice.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or Password is not correct";
      }
    })
    
  }
}
