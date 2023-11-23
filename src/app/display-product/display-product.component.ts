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
  constructor(private activateRoute : ActivatedRoute, private productservice : ProductService){}

  ngOnInit() : void{
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.productservice.getproduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productdata = result;
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
  
}
