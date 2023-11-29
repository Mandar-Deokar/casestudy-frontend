import { Component } from '@angular/core';
import { Product } from '../_.model/productmodel';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_.services/product.service';
import { Cart } from '../_.model/cartmodel';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent {
  productdata: Product | undefined;
  productQuantity: number = 1;
  removeCart = false;
  cartData: Product | undefined
  constructor(private activateRoute: ActivatedRoute, private productservice: ProductService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.productservice.getproduct(productId).subscribe((result) => {
      console.warn(result);
      this.productdata = result;

      let cartData = localStorage.getItem('localcart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId == item.productId.toString())
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');

      if (user) {
        let userId = user && JSON.parse(user).userId;
        this.productservice.getcartList(userId);
        this.productservice.cartData.subscribe((result) => {
          let item: Product[] = result;
          let filteredItems: Product[] = item.filter(
            (product: Product) => productId?.toString() === product.productId.toString()
          );

          //console.log(filteredItems);
          if (filteredItems.length > 0) {
            //console.log(item);
            this.cartData = item[0]
            this.removeCart = true;
          }
        })
      }
    })
  }


  handlequantity(operation: string) {
    if (this.productQuantity < 20 && operation === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && operation === 'minus') {
      this.productQuantity -= 1;
    }
  }

  AddToCart() {
    if (this.productdata) {
      this.productdata.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        console.warn(this.productdata);
        this.productservice.localAddtoCart(this.productdata);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).userId;
        let cartData: Cart = {
          ...this.productdata,
          userId,
          productId: this.productdata.productId,
          cartId: undefined,

        }
        delete cartData.cartId;
        //console.warn(cartData);

        this.productservice.addToCart(cartData).subscribe((result) => {
          console.warn('result', result);
          if (result) {
            this.productservice.getcartList(userId);
            this.removeCart = true;
          }
        })
      }

    }
  }

  removeToCart(productId: number) {

    if (!localStorage.getItem('user')) {
      this.productservice.removeItemFromCart(productId);

    }
    else {
      console.warn(this.cartData);
      this.cartData && this.productservice.removeToCart(this.cartData)
        .subscribe((result) => {
          if (result) {
            let user = localStorage.getItem('user');
            let userId = user && JSON.parse(user).userId;
            this.productservice.getcartList(userId);
          }
        })
    }
    this.removeCart = false;

  }

}
