import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_.services/product.service';
import { Product } from '../_.model/productmodel';

@Component({
  selector: 'app-vendor-updateproduct',
  templateUrl: './vendor-updateproduct.component.html',
  styleUrls: ['./vendor-updateproduct.component.css']
})
export class VendorUpdateproductComponent {

  product : undefined | Product;
  updateproductmessage : undefined | string;
  constructor(private route : ActivatedRoute, private productservice : ProductService){}

  ngOnInit(): void{
    let productId = this.route.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.productservice.getproduct(productId).subscribe((data)=>{
      console.warn(data);
      this.product = data;
    });
  }

  updateproduct(data : Product){
    console.warn(data);
    
    // this.productservice.updateproduct(data).subscribe((result)=>{
    //   if(result){
    //     this.updateproductmessage = "Product Updaetd";
    //   }

    // });
    // setTimeout(()=>{this.updateproductmessage = undefined},2000)
    
  }
}
