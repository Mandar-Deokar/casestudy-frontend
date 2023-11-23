import { Component } from '@angular/core';
import { ProductService } from '../_.services/product.service';
import { Product } from '../_.model/productmodel';

@Component({
  selector: 'app-vendor-addproduct',
  templateUrl: './vendor-addproduct.component.html',
  styleUrls: ['./vendor-addproduct.component.css']
})
export class VendorAddproductComponent {

  addproductmessage : string | undefined;
  constructor(private product : ProductService){}

  addproduct(data : Product ){
    console.log(data); 
    this.product.addproduct(data).subscribe((result)=>{
      console.warn(data);
      if(result){
        this.addproductmessage = "Product is successfully added"; 
      }
      setTimeout(()=>this.addproductmessage=undefined,2000);
    })

    

  }
}
