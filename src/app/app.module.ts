import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { VendorAuthComponent } from './vendor-auth/vendor-auth.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { VendorAddproductComponent } from './vendor-addproduct/vendor-addproduct.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VendorUpdateproductComponent } from './vendor-updateproduct/vendor-updateproduct.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DisplayProductComponent } from './display-product/display-product.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ProductCatgoryComponent } from './product-catgory/product-catgory.component';
import { ProductCatgoryNavbarComponent } from './product-catgory-navbar/product-catgory-navbar.component';
import { DisplayCartComponent } from './display-cart/display-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { BuyNowComponent } from './buy-now/buy-now.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VendorAuthComponent,
    VendorHomeComponent,
    VendorAddproductComponent,
    VendorUpdateproductComponent,
    DisplayProductComponent,
    SearchProductComponent,
    UserAuthComponent,
    ProductCatgoryComponent,
    ProductCatgoryNavbarComponent,
    DisplayCartComponent,
    CheckoutComponent,
    MyOrdersComponent,
    MyProfileComponent,
    BuyNowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
