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
import { ProductCatgoryComponent } from './product-catgory/product-catgory.component';
import { ProductCatgoryNavbarComponent } from './product-catgory-navbar/product-catgory-navbar.component';
import { DisplayCartComponent } from './display-cart/display-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


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
  },
  {
    path : 'category-navbar',
    component : ProductCatgoryNavbarComponent
  },
  {
    path : 'display-cart',
    component : DisplayCartComponent
  },
  {
    path : 'checkout',
    component : CheckoutComponent
  },
  {
    path : 'myorders' ,
    component : MyOrdersComponent
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
