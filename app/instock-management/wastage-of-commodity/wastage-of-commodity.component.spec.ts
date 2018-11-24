import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WastageOfCommodityComponent } from './wastage-of-commodity.component';

describe('WastageOfCommodityComponent', () => {
  let component: WastageOfCommodityComponent;
  let fixture: ComponentFixture<WastageOfCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastageOfCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastageOfCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
