import { Component } from '@angular/core';
import { Product } from '../_.model/productmodel';
import { ProductService } from '../_.services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent {
  product: Product | undefined;
  totalprice: number = 0;
  OrderMessage : string | undefined;


  constructor(public productservice: ProductService, private route : ActivatedRoute) { }

  ngOnInit() {

    // this.productservice.buyNowData.subscribe((result)=>{

    //   console.warn(result);
    // });
  
    
    // this.productservice.buyNowData.subscribe((result : Product) => {

    //   //console.warn(result);

    //   let price: number = 0;
    //   this.product = result;

    //   if(this.product){
    //     //console.log(this.product);
        
    //     if (this.product.quantity) {
    //       price = (this.product.price * + this.product.quantity);
    //     }
    //     //console.warn(price);
    //     //console.warn(this.product);
    //   }

    //   this.totalprice = price + (price / 10) + 100 - (price / 10);

    //   //console.warn(this.totalprice);
    //   //console.warn(this.product);
    //   this.doSomethingWithProduct(result);

    // })

    let productId = this.route.snapshot.paramMap.get('productId');
    let quantity = this.route.snapshot.paramMap.get('quantity');

    productId && this.productservice.getproduct(productId).subscribe((result)=>{
      console.log(result);
      this.product = result;
    })

 
  
   
  }

  // doSomethingWithProduct(data : Product) {
  //   this.product = data;
  //   console.warn(this.product);
  // }
}
