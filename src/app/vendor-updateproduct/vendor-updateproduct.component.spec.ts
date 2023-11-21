import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdateproductComponent } from './vendor-updateproduct.component';

describe('VendorUpdateproductComponent', () => {
  let component: VendorUpdateproductComponent;
  let fixture: ComponentFixture<VendorUpdateproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorUpdateproductComponent]
    });
    fixture = TestBed.createComponent(VendorUpdateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
