import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutBoundComponent } from './out-bound.component';

describe('OutBoundComponent', () => {
  let component: OutBoundComponent;
  let fixture: ComponentFixture<OutBoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutBoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutBoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
