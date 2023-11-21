import { Component } from '@angular/core';
import { ProductService } from '../_.services/product.service';
import { Product } from '../_.model/productmodel';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productlist : undefined | Product[]
  icon  = faTrash
  edit = faEdit
  constructor(private productservice : ProductService){}

  ngOnInit(){
    this.productservice.productList().subscribe((data)=>{
      this.productlist = data
    })
  }

  displayproduct(product : Product){
    return product;
  }

}
