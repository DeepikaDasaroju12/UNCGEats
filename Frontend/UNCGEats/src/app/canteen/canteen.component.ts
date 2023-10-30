import { Component } from '@angular/core';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css']
})
export class CanteenComponent {
  canteens : any[] = [
    {
      name: 'Canteen 1',
      location: 'Building A, 1st Floor',
      details: 'Serving a variety of meals and snacks.',
      timings: '9:00 AM - 6:00 PM',
      workingHours: 'Monday - Friday',
      foodItemsLink: 'canteen1',
    },
    {
      name: 'Canteen 2',
      location: 'Building A, 3rd Floor',
      details: 'Specializing in local cuisine and beverages.',
      timings: '10:00 AM - 7:00 PM',
      workingHours: 'Monday - Saturday',
      foodItemsLink: 'canteen2',
    },
    {
      name: 'Canteen 3',
      location: 'Building A, 2nd Floor',
      details: 'Healthy food options and refreshing drinks.',
      timings: '10:00 AM - 7:00 PM',
      workingHours: 'Monday - Friday',
      foodItemsLink: 'canteen3',
    },
  ];
  selectedCanteen: any | null = null;

  showCanteenDetails(canteen: any): void {
    this.selectedCanteen = canteen;
  }
}

