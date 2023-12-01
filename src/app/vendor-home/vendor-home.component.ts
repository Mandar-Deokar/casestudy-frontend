import { Component } from '@angular/core';
import { VendorService } from '../_.services/vendor.service';
import { ProductService } from '../_.services/product.service';
import { Product } from '../_.model/productmodel';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.css']
})
export class VendorHomeComponent {
  productlist : undefined | Product[]
  deleteproductmessage : undefined | string 
  icon  = faTrash
  edit = faEdit

 constructor(private productservice : ProductService){}

 ngOnInit(): void{
  this.list();
 }

 delete(productId : number){
  console.warn(productId);
  this.productservice.deleteproduct(productId).subscribe((result)=>{
    if(result){
      this.deleteproductmessage = "product is deleted";
      this.list();
    }
    
  })
  setTimeout(()=>this.deleteproductmessage=undefined,2000);
 }
 list(){
  let vendor = localStorage.getItem('vendor');
    let userId = vendor && JSON.parse(vendor).userId;
  this.productservice.productList().subscribe((result)=>{
    this.productlist = result;
    console.log(this.productlist);
  });
 }
}
