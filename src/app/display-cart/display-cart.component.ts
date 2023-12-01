import { Component } from '@angular/core';
import { Cart } from '../_.model/cartmodel';
import { PriceSummary } from '../_.model/PriceSummary';
import { ProductService } from '../_.services/product.service';
import { Router } from '@angular/router';
import { Product } from '../_.model/productmodel';
import { CartItem } from '../_.model/cartItemmodel';

@Component({
  selector: 'app-display-cart',
  templateUrl: './display-cart.component.html',
  styleUrls: ['./display-cart.component.css']
})
export class DisplayCartComponent {

  productQuantity : number = 1;
  cartData: CartItem[] | undefined;
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private productservice : ProductService, private router: Router) { }

  ngOnInit(): void {
   this.loadDetails()

  }

  removeToCart(cartItemId: number | undefined) {
    cartItemId && this.cartData && this.productservice.removeFromCart(cartItemId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }

  loadDetails(){
    this.productservice.currentCart().subscribe((result) => {
      this.cartData = result;
      
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

    if(!this.cartData.length){
      this.router.navigate(['/'])
    }

    })
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

  handlequantity(operation: string, cartItem : CartItem) {
    if(cartItem.quantity){
      if (cartItem.quantity < 20 && operation === 'plus') {
        cartItem.quantity += 1;
        //console.log(cartItem.quantity)
        this.productservice.changeQuantity(cartItem);
        //this.loadDetails();
      }
      else if (cartItem.quantity > 1 && operation === 'minus') {
        cartItem.quantity -= 1;
        this.productservice.changeQuantity(cartItem);
        //this.loadDetails();
      }
    }
  }
}
