import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCanteenRequestsComponent } from './add-canteen-requests.component';

describe('AddCanteenRequestsComponent', () => {
  let component: AddCanteenRequestsComponent;
  let fixture: ComponentFixture<AddCanteenRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCanteenRequestsComponent]
    });
    fixture = TestBed.createComponent(AddCanteenRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
