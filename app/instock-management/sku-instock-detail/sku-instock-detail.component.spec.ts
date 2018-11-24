import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuInstockDetailComponent } from './sku-instock-detail.component';

describe('SkuInstockDetailComponent', () => {
  let component: SkuInstockDetailComponent;
  let fixture: ComponentFixture<SkuInstockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuInstockDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuInstockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
