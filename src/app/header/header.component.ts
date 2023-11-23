import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_.services/product.service';
import { Product } from '../_.model/productmodel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType : string = 'default';
  vendorName : string = '';
  searchResult : undefined | Product[];
  constructor(private router:Router, private productservice : ProductService){}
  logout(){
    localStorage.removeItem('vendor');
    this.router.navigate(['home']);
  }

  ngOnInit(): void{
    this.router.events.subscribe((val : any)=>{
      if(val.url){
        if(localStorage.getItem('vendor') && val.url.includes('vendor')){
          console.warn("in vendor area");
          this.menuType = 'vendor';
          if(localStorage.getItem('vendor')){
            let vendorstore = localStorage.getItem('vendor');
            console.log(vendorstore);

            let vendorData = vendorstore && JSON.parse(vendorstore);
            console.log(vendorData);
            if (vendorData && vendorData.name) {
              this.vendorName = vendorData.name;
            } else {
              console.error("Vendor data or 'name' property is undefined");
            }
          }
        }
        else {
          console.warn("outside vendor area");
          this.menuType = 'default'
        }
      }
    })
  }

  searchproduct(data : KeyboardEvent){
    if(data){
      const element = data.target as HTMLInputElement;
      this.productservice.searchproduct(element.value).subscribe((result : Product[])=>{ 
        if(result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
        console.log(this.searchResult);
      })
    }
  }

  hideSearch(){
    this.searchResult = undefined;
  }
  onSearch(searchString : string){
    this.router.navigate([`search/${searchString}`]);
  }

  redirectToDetails(productId : number){
    this.router.navigate(['display-product/'+productId]);
  }
}
