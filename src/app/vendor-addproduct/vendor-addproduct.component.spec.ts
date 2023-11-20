import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddproductComponent } from './vendor-addproduct.component';

describe('VendorAddproductComponent', () => {
  let component: VendorAddproductComponent;
  let fixture: ComponentFixture<VendorAddproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorAddproductComponent]
    });
    fixture = TestBed.createComponent(VendorAddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
