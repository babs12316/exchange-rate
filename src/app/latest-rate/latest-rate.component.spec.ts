import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestRateComponent } from './latest-rate.component';

describe('LatestRateComponent', () => {
  let component: LatestRateComponent;
  let fixture: ComponentFixture<LatestRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
