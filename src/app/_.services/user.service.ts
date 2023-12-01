import { EventEmitter, Injectable } from '@angular/core';
import { SignUp } from '../_.model/signupmodel';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LogIn } from '../_.model/loginmodel';
import { User } from '../_.model/usermodel';
import { Cart } from '../_.model/cartmodel';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedin = new BehaviorSubject<boolean>(false);
  invalidUserAuth = new EventEmitter<boolean>(false); 

  constructor(private http: HttpClient, private router: Router, private productservice : ProductService) { }

  userSignup(data: SignUp) {
    this.http.post('http://localhost:8080/signup', data, { observe: 'response' }).
      subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/home']);
        }

      })
  }
  reloaduser() {
    if (localStorage.getItem('user')) {
      console.warn("user logged in");
      this.isUserLoggedin.next(true);
      this.router.navigate(['/home']);
    }
  }

  userLogin(data: LogIn) {
    this.http.post('http://localhost:8080/login', data, { observe: 'response' }).
      subscribe(
        (result) => {
        if (result) {
          if (result && result.body) {
            //console.warn(result);
            this.invalidUserAuth.emit(false);
            localStorage.setItem('user', JSON.stringify(result.body));

            
              let localCartData = localStorage.getItem('localCart');
              let user = localStorage.getItem('user');
              let userId = user && JSON.parse(user).userId;
              if(localCartData){
                let items : Cart[] = JSON.parse(localCartData);
                items.forEach((item : Cart)=>{
                  item.userId = userId;
                  this.productservice.addToCart(item)
                })
                localStorage.removeItem('localCart');
              }
            

            this.router.navigate(['/home']);
            console.warn("user logged in");
          }
          else {
            this.invalidUserAuth.emit(true);
            console.log("login failed");
          }
        }
        
      },
      (error)=>{
        if(error.status === 500){
          this.invalidUserAuth.emit(true);
        }
        console.error(error);
      }
      );
      
  }

  getUser(userId : string){
    return this.http.get<User>(`http://localhost:8080/getprofile/${userId}`);
  }

  updateUser(user : User){
    return this.http.post<User>(`http://localhost:8080/updateProfile`,user);
  }
}


