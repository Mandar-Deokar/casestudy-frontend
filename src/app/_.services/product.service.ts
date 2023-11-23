import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_.model/productmodel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  addproduct(data : Product){
    return this.http.post(`http://localhost:8080/products/addProduct`,data);
  }

  productList(){
    return this.http.get<Product[]>(`http://localhost:8080/products`);
  }

  deleteproduct(productId : number){
    return this.http.delete<Product>(`http://localhost:8080/products/${productId}`);
  }

  getproduct(productId : string){
    return this.http.get<Product>(`http://localhost:8080/products/getById/${productId}`);
  }


  updateproduct(product : Product){
    return this.http.post<Product>(`http://localhost:8080/products/update`,product);
  }

  searchproduct(searchString : string){
    return this.http.get<Product[]>(`http://localhost:8080/products/search/${searchString}`);
  }

}
