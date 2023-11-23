import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_.model/productmodel';
import { ProductService } from '../_.services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {


  searchResult : undefined | Product[]
  constructor(private activatedRoute: ActivatedRoute, private productservice : ProductService){}

  ngOnInit(): void{
    let searchString = this.activatedRoute.snapshot.paramMap.get('searchString');
    console.warn(searchString);
    searchString && this.productservice.searchproduct(searchString).subscribe((result)=>{
      this.searchResult = result
    })
  }
}
