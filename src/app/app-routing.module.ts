import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorAuthComponent } from './vendor-auth/vendor-auth.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { authGuard } from './auth.guard';
import { VendorAddproductComponent } from './vendor-addproduct/vendor-addproduct.component';
import { VendorUpdateproductComponent } from './vendor-updateproduct/vendor-updateproduct.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path : 'vendor-auth',
    component : VendorAuthComponent
  },
  {
    path : 'vendor-home',
    component : VendorHomeComponent,
    canActivate : [authGuard]
  },
  {
    path : 'vendor-addproduct',
    component : VendorAddproductComponent,  
    canActivate : [authGuard]
  },
  {
    path : 'vendor-updateproduct/:productId',
    component : VendorUpdateproductComponent,
    canActivate : [authGuard]
  },
  {
    path : 'display-product/:productId',
    component : DisplayProductComponent
  },
  {
    path : 'search/:searchString',
    component : SearchProductComponent
  },
  {
    path : 'user-auth',
    component : UserAuthComponent
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
