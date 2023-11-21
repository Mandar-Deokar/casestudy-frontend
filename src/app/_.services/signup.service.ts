import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../_.model/signupmodel';
import { BehaviorSubject } from 'rxjs';
import { Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  isVendorLoggedin = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignup(data: SignUp) {

    this.http.post('http://localhost:8080/signup',
    data,
    {observe:"response"}
    ).subscribe((result)=>{
      this.isVendorLoggedin.next(true);
      localStorage.setItem('vendor',JSON.stringify(result.body));
      this.router.navigate(['vendor-home']);
      console.warn('result',result); 
    });
    return false;
  }

  reloadvendor() {
    if(localStorage.getItem('vendor')){
      this.isVendorLoggedin.next(true);
      this.router.navigate(['vendor-home']);
    }
  }
}
