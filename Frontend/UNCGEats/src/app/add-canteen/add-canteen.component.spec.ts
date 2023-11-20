import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCanteenComponent } from './add-canteen.component';

describe('AddCanteenComponent', () => {
  let component: AddCanteenComponent;
  let fixture: ComponentFixture<AddCanteenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCanteenComponent]
    });
    fixture = TestBed.createComponent(AddCanteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
