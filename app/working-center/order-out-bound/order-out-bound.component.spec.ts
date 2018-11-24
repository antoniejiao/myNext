import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOutBoundComponent } from './order-out-bound.component';

describe('OrderOutBoundComponent', () => {
  let component: OrderOutBoundComponent;
  let fixture: ComponentFixture<OrderOutBoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOutBoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOutBoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
