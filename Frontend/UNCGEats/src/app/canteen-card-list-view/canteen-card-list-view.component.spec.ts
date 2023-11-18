import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenCardListViewComponent } from './canteen-card-list-view.component';

describe('CanteenCardListViewComponent', () => {
  let component: CanteenCardListViewComponent;
  let fixture: ComponentFixture<CanteenCardListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanteenCardListViewComponent]
    });
    fixture = TestBed.createComponent(CanteenCardListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
