import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCanteenRequestsComponent } from './manage-canteen-requests.component';

describe('ManageCanteenRequestsComponent', () => {
  let component: ManageCanteenRequestsComponent;
  let fixture: ComponentFixture<ManageCanteenRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCanteenRequestsComponent]
    });
    fixture = TestBed.createComponent(ManageCanteenRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
