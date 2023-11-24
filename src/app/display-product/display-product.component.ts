import { Component } from '@angular/core';
import { Product } from '../_.model/productmodel';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_.services/product.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent {
  productdata : undefined | Product
  productQuantity : number=1
  removeCart = false
  constructor(private activateRoute : ActivatedRoute, private productservice : ProductService){}

  ngOnInit() : void{
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.productservice.getproduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productdata = result;

      let cartData = localStorage.getItem('localcart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item : Product)=> productId == item.productId.toString())
        if(items.length){
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }
    })
  }


  handlequantity(operation : string){
    if(this.productQuantity <20 && operation==='plus'){
      this.productQuantity += 1;
    }
    else if(this.productQuantity>1 && operation==='minus'){
      this.productQuantity -= 1;
    }
  }

  AddToCart(){
    if(this.productdata){
      this.productdata.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        console.warn(this.productdata);
        this.productservice.localAddtoCart(this.productdata);
        this.removeCart = true;
      }
      
    }
  }

  removeToCart(productId:number){

  }
  
}
