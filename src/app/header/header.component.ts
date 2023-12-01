import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_.services/product.service';
import { Product } from '../_.model/productmodel';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType : string = 'default';
  vendorName : string = '';
  searchResult : undefined | Product[];
  userName : string = '';
  userId: number = 0;
 
  cartItems : number = 0
  constructor(private router:Router, private productservice : ProductService, private route : ActivatedRoute){}
  logout(){
    localStorage.removeItem('vendor');
    this.router.navigate(['home']);
  }

  ngOnInit(): void{
    this.router.events.subscribe((val : any)=>{
      if(val.url){
        if(localStorage.getItem('vendor') && val.url.includes('vendor')){
          //console.warn("in vendor area");
          this.menuType = 'vendor';
          if(localStorage.getItem('vendor')){
            let vendorstore = localStorage.getItem('vendor');
            //console.log(vendorstore);

            let vendorData = vendorstore && JSON.parse(vendorstore);
            //console.log(vendorData);
            if (vendorData && vendorData.name) {
              this.vendorName = vendorData.name;
              this.userId = vendorData.userId;
            } else {
              console.error("Vendor data or 'name' property is undefined");
            }
          }
        }
        else if(localStorage.getItem('user')){
          let userrstore = localStorage.getItem('user');
          let userData = userrstore && JSON.parse(userrstore);
          this.userName = userData.name;
          this.userId = userData.userId;
          this.menuType = 'user';
          this.productservice.getcartList(userData.userId)
        }
        else {
          //console.warn("outside vendor area");
          this.menuType = 'default'
        }
      }
    })

    let cartdata = localStorage.getItem('localCart');
    if(cartdata){
      this.cartItems = JSON.parse(cartdata).length
      console.warn(cartdata)
    }
    this.productservice.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    })

  }

  userlogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.productservice.cartData.emit([]);
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
