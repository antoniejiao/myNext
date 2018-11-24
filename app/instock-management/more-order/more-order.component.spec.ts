import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreOrderComponent } from './more-order.component';

describe('MoreOrderComponent', () => {
  let component: MoreOrderComponent;
  let fixture: ComponentFixture<MoreOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
