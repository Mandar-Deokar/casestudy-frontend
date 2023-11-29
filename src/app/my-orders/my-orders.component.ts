import { Component } from '@angular/core';
import { Order, OrderItem } from '../_.model/ordermodel';
import { ProductService } from '../_.services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData: Order[]|undefined
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

}
