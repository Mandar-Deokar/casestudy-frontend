import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { VendorService } from './_.services/vendor.service';

export const authGuard: CanActivateFn = (route, state) => {
  const vendorservice  = inject(VendorService);
  if(localStorage.getItem('vendor')){
    return true;
  }
  return vendorservice.isVendorLoggedin;
};
