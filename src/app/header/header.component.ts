import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType : String = 'default';
  vendorName : String = '';
  constructor(private router:Router){}
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
            let vendorData = vendorstore && JSON.parse(vendorstore);
          }
        }
        else {
          console.warn("outside vendor area");
          this.menuType = 'default'
        }
      }
    })
  }
}
