import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataMessageComponent } from './show-data-message.component';

describe('ShowDataMessageComponent', () => {
  let component: ShowDataMessageComponent;
  let fixture: ComponentFixture<ShowDataMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDataMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDataMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
