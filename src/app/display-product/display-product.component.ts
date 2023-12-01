import { Component } from '@angular/core';
import { Product } from '../_.model/productmodel';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private activateRoute: ActivatedRoute, private productservice: ProductService, private router : Router) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    //console.warn(productId);
    productId && this.productservice.getproduct(productId).subscribe((result) => {
      //console.warn(result);
      this.productdata = result;

      let cartData = localStorage.getItem('localCart');
     //console.warn(cartData)
      if (productId && cartData) {
        let item : Product[] = JSON.parse(cartData);
        //console.warn(cartData);
        //console.warn(items)
        let filteredItems : Product[] = item.filter((product: Product) => productId?.toString() === product.productId.toString())
        //console.warn(productId)
        //console.warn(items.length);
        console.warn(filteredItems);
        if (filteredItems.length > 0) {
          this.removeCart = true;
          if(filteredItems[0].quantity){
            this.productQuantity  = filteredItems[0].quantity;
          }
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
            this.cartData = filteredItems[0]
            this.removeCart = true;
            if(filteredItems[0].quantity){
              this.productQuantity  = filteredItems[0].quantity;
            }
          }
        })
      }
    })
    //console.warn(this.productdata)
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
      let cartData = localStorage.getItem('localCart');
      if(!cartData){
        localStorage.removeItem('localCart');
      }

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

  buynow(data : Product){
    
    let quantity = this.productQuantity;
    let productId = data.productId;



    // let productdata : Product = {
    //   ...data,
    // }
    // this.productservice.buynow(productdata);
    //const answer = 56
    this.router.navigate([`buy-now/${this.productdata?.productId}/${this.productQuantity}`]);
    //console.warn(data);
  }

}
