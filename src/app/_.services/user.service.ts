import { Injectable } from '@angular/core';
import { SignUp } from '../_.model/signupmodel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  userSignup(data : SignUp){
    this.http.post('http://localhost:8080/signup',data,{observe : 'response'}).
    subscribe((result)=>{
      console.warn(result);
    })
  }
}
