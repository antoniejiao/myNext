import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstockItemsComponent } from './instock-items.component';

describe('InstockItemsComponent', () => {
  let component: InstockItemsComponent;
  let fixture: ComponentFixture<InstockItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstockItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstockItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
