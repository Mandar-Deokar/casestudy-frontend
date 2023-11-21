import { Component } from '@angular/core';
import { Product } from '../_.model/productmodel';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent {
  product : undefined | Product ;

  
}
