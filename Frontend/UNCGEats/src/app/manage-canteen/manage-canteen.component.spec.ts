import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCanteenComponent } from './manage-canteen.component';

describe('ManageCanteenComponent', () => {
  let component: ManageCanteenComponent;
  let fixture: ComponentFixture<ManageCanteenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCanteenComponent]
    });
    fixture = TestBed.createComponent(ManageCanteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
