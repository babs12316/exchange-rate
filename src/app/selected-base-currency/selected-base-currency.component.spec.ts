import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBaseCurrencyComponent } from './selected-base-currency.component';

describe('SelectedBaseCurrencyComponent', () => {
  let component: SelectedBaseCurrencyComponent;
  let fixture: ComponentFixture<SelectedBaseCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedBaseCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBaseCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
