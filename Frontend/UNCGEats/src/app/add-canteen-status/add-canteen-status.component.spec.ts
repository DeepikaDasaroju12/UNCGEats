import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCanteenStatusComponent } from './add-canteen-status.component';

describe('AddCanteenStatusComponent', () => {
  let component: AddCanteenStatusComponent;
  let fixture: ComponentFixture<AddCanteenStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCanteenStatusComponent]
    });
    fixture = TestBed.createComponent(AddCanteenStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
