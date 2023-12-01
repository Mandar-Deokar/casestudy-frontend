import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../_.model/productmodel';
import { Cart } from '../_.model/cartmodel';
import { CartItem } from '../_.model/cartItemmodel';
import { Order, OrderItem } from '../_.model/ordermodel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Product[] | []>();
  buyNowData = new EventEmitter<Product | undefined >();

  constructor(private http : HttpClient) { }

  addproduct(data : Product){
    return this.http.post(`http://localhost:8080/products/addProduct`,data);
  }

  productList(){
    return this.http.get<Product[]>(`http://localhost:8080/products`,);
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

  localAddtoCart(data : Product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');

    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      cartData  = [data];
    }
    else {
      cartData = JSON.parse(localCart);
      if (!Array.isArray(cartData)) {
        cartData = []; 
      }
      cartData.push(data);
      console.log('cartData:', cartData); 
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
      
    }
    
  }

  removeItemFromCart(productId : number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items : Product[] = JSON.parse(cartData);
      
      if (!Array.isArray(items)) {
        items = []; 
      }

      items = items.filter((item : Product)=>productId !== item.productId);

      console.warn(items);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(items);
    }
  }


  addToCart(cartData : Cart){
    return this.http.post(`http://localhost:8080/cart/${cartData.userId}/add/${cartData.productId}`,cartData);
  }

  getcartList(userId : number){
    return this.http.get<Product[]>(`http://localhost:8080/cart/${userId}/getCart`, 
    {observe : 'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body);
      }
      
    })

  }

  removeToCart(cartData : Product){
    
    return this.http.get(`http://localhost:8080/cart/${cartData.userId}/remove/${cartData.productId}`);
  }

  getCartIem(cartId : number){
    return this.http.get(`http://localhost:8080/cart/${cartId}`);
  }

  removeFromCart(cartId : number){
    return this.http.get(`http://localhost:8080/cart/remove/${cartId}`);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<CartItem[]>(`http://localhost:8080/cart/${userData.userId}/getCart`);
  }

  orderNow(data: Order) {
    return this.http.post(`http://localhost:8080/order/createOrder`, data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(`http://localhost:8080/orders/${userData.userId}`);
  }

  deleteCartItems(cartId: number) {
    return this.http.get(`http://localhost:8080/cart/remove/${cartId}`).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  // buynow(data : Product){
  //   this.buyNowData.emit(data);
  // }

  changeQuantity(cart : CartItem){
    //console.log(cart);
    this.http.post<CartItem>(`http://localhost:8080/cart/${cart.userId}/changeQuantity/${cart.productId}`, cart.quantity)
    .subscribe((result)=>{
      console.warn(result);
    });
  }

 
}
