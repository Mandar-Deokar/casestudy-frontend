import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatgoryNavbarComponent } from './product-catgory-navbar.component';

describe('ProductCatgoryNavbarComponent', () => {
  let component: ProductCatgoryNavbarComponent;
  let fixture: ComponentFixture<ProductCatgoryNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCatgoryNavbarComponent]
    });
    fixture = TestBed.createComponent(ProductCatgoryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
