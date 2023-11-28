import { Component } from '@angular/core';
import { Cart } from '../_.model/cartmodel';
import { ProductService } from '../_.services/product.service';
import { Router } from '@angular/router';
import { CartItem } from '../_.model/cartItemmodel';
import { Order } from '../_.model/ordermodel';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  cartData: CartItem[] | undefined;
  orderMsg: string | undefined;
  constructor(private productservice: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productservice.currentCart().subscribe((result) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      console.warn(this.totalPrice);

    })

  }


  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        orderId: undefined,
        orderItemId : undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.cartItemId && this.productservice.deleteCartItems(item.cartItemId);
        }, 700)
      })

      this.productservice.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders'])
          }, 4000);

        }

      })
    }

  }
}
