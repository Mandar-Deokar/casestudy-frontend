import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorAuthComponent } from './vendor-auth/vendor-auth.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { authGuard } from './auth.guard';
import { VendorAddproductComponent } from './vendor-addproduct/vendor-addproduct.component';


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
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
