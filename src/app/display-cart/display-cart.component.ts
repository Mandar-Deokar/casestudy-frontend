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

  removeToCart(cartId: number | undefined) {
    cartId && this.cartData && this.productservice.removeFromCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }

  loadDetails(){
    this.productservice.currentCart().subscribe((result) => {
      this.cartData = result;
      console.log(this.cartData);
      
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
}
