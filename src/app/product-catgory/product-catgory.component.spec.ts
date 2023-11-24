import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatgoryComponent } from './product-catgory.component';

describe('ProductCatgoryComponent', () => {
  let component: ProductCatgoryComponent;
  let fixture: ComponentFixture<ProductCatgoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCatgoryComponent]
    });
    fixture = TestBed.createComponent(ProductCatgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
