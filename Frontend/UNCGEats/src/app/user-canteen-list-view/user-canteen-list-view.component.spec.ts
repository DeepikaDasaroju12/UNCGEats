import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCanteenListViewComponent } from './user-canteen-list-view.component';

describe('UserCanteenListViewComponent', () => {
  let component: UserCanteenListViewComponent;
  let fixture: ComponentFixture<UserCanteenListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCanteenListViewComponent]
    });
    fixture = TestBed.createComponent(UserCanteenListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
