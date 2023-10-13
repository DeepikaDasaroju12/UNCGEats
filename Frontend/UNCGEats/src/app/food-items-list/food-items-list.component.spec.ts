import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemsListComponent } from './food-items-list.component';

describe('FoodItemsListComponent', () => {
  let component: FoodItemsListComponent;
  let fixture: ComponentFixture<FoodItemsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodItemsListComponent]
    });
    fixture = TestBed.createComponent(FoodItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
