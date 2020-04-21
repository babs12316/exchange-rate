import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCurrencyCompareComponent } from './base-currency-compare.component';

describe('BaseCurrencyCompareComponent', () => {
  let component: BaseCurrencyCompareComponent;
  let fixture: ComponentFixture<BaseCurrencyCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseCurrencyCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCurrencyCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
