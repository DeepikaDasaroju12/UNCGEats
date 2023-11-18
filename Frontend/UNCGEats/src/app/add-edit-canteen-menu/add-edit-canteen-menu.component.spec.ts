import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCanteenMenuComponent } from './add-edit-canteen-menu.component';

describe('AddEditCanteenMenuComponent', () => {
  let component: AddEditCanteenMenuComponent;
  let fixture: ComponentFixture<AddEditCanteenMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCanteenMenuComponent]
    });
    fixture = TestBed.createComponent(AddEditCanteenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
