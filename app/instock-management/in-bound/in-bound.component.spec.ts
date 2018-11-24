import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InBoundComponent } from './in-bound.component';

describe('InBoundComponent', () => {
  let component: InBoundComponent;
  let fixture: ComponentFixture<InBoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InBoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InBoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
