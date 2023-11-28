import { Component, numberAttribute } from '@angular/core';
import { SignUp } from '../_.model/signupmodel';
import { UserService } from '../_.services/user.service';
import { LogIn } from '../_.model/loginmodel';
import { Product } from '../_.model/productmodel';
import { Cart } from '../_.model/cartmodel';
import { ProductService } from '../_.services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showlogin = false;
  isAuthError : string = "";
  constructor(private userservice: UserService, private productservice : ProductService) { }
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

  localCartToRemoteCart(){

    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).userId;
    if(data){
      let cartDataList : Product[] = JSON.parse(data);
      cartDataList.forEach((product : Product, index)=> {

        let cartData : Cart = {
          ...product,
          productId : product.productId,
          userId,
          cartId : undefined
        }

        delete cartData.cartId;


        setTimeout(()=>{
          this.productservice.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("items stored in db");
            }
          })
          if(cartDataList.length === index+1){
            localStorage.removeItem('localCart');
          }
        }, 500)
        

      })
    }
    setTimeout(() => {
      this.productservice.getcartList(userId);
    }, 2000);
    
  }

}
