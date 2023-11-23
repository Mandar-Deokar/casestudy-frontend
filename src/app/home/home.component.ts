import { Component } from '@angular/core';
import { ProductService } from '../_.services/product.service';
import { Product } from '../_.model/productmodel';
import { faCartShopping, faCircle, faCircleInfo, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productlist : undefined | Product[]
  icon  = faTrash
  edit = faEdit
  cart = faCartShopping
  details = faCircleInfo
  constructor(private productservice : ProductService){}

  ngOnInit(){
    this.productservice.productList().subscribe((data : Product[])=>{
      this.productlist = data
    })
  }

 
}
