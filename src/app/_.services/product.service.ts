import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_.model/productmodel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  addproduct(data : Product){
    return this.http.post('http://localhost:8080/products/addProduct',data);
  }

  productList(){
    return this.http.get<Product[]>("http://localhost:8080/products");
  }
}
