import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../_.model/signupmodel';
import { Route, Router } from '@angular/router';
import { LogIn } from '../_.model/loginmodel';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  isVendorLoggedin = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }
  userSignup(data: SignUp) : boolean {

    this.http.post('http://localhost:8080/signup',
      data,
      { observe: "response" }
    ).subscribe((result) => {
      this.isVendorLoggedin.next(true);
      localStorage.setItem('vendor',JSON.stringify(result.body));
      this.router.navigate(['vendor-home']);
      console.warn('result', result);
    });
    return false;
  }

  reloadvendor() {
    if (localStorage.getItem('vendor')) {
      this.isVendorLoggedin.next(true);
      this.router.navigate(['vendor-home']);
    }
  }

  userLogin(data: LogIn) {
    //console.warn(data);
    this.http.post('http://localhost:8080/login',
      data,
      { observe: "response" }
    ).subscribe(
      (result: any) => {
        //console.warn(result.body.length);
        if (result && result.body) {
          localStorage.setItem('vendor', JSON.stringify(result.body));
          this.router.navigate(['vendor-home']);
          console.warn("vendor logged in")
        } else {
          console.warn("login failed");
        }
      },
      (error)=>{
        if(error.status === 500){
          this.isLoginError.emit(true);
        }
        console.error(error);
      }
      
    )
    
  }
}
