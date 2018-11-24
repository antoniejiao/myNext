import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageInShipAreaComponent } from './package-in-ship-area.component';

describe('PackageInShipAreaComponent', () => {
  let component: PackageInShipAreaComponent;
  let fixture: ComponentFixture<PackageInShipAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageInShipAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageInShipAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
