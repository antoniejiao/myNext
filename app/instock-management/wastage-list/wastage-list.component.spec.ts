import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WastageListComponent } from './wastage-list.component';

describe('WastageListComponent', () => {
  let component: WastageListComponent;
  let fixture: ComponentFixture<WastageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
