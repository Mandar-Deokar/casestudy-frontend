import { Component } from '@angular/core';
import { VendorService } from '../_.services/vendor.service';
import { ProductService } from '../_.services/product.service';
import { Product } from '../_.model/productmodel';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.css']
})
export class VendorHomeComponent {
  productlist : undefined | Product[]

 constructor(private productservice : ProductService){}

 ngOnInit(): void{
  this.productservice.productList().subscribe((result)=>{
    this.productlist = result;
    console.log(this.productlist);

  })
 }
}
