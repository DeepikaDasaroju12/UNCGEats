
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Owner } from '../models/owner.model'; // Import the UserService
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { Canteen } from '../models/canteen.model';



@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  // ownerForm: FormGroup = new FormGroup({});
  canteenForm : FormGroup = new FormGroup({});
  canteenRequestForm: FormGroup = new FormGroup({});
  // owner : Owner = {
  //   Name: '',
  //   Password: '',
  //   PhoneNumber: 0,
  //   Email: '',
  //   CanteenId: []
  // }
  canteen: Canteen = {
    Name: '',
    OwnerId: 0,
    Address: '',
    Latitude: 0,
    Longitude: 0,
    Description: '',
    WorkingHours: '0',
    AverageRating: 0,
  };

  canteenRequest: Canteen = {
    Name: '',
    OwnerId: 0,
    Address: '',
    Latitude: 0,
    Longitude: 0,
    Description: '',
    WorkingHours: '0',
    AverageRating: 0
  };
  canteenAdded: boolean = false;
  canteenRequestSent: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.canteenForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      Latitude: ['', Validators.required],
      Longitude: ['', Validators.required],
      Description: ['', Validators.required],
    });

    this.canteenRequestForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      Latitude: ['', Validators.required],
      Longitude: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  addCanteen(): void {
    // Create a new Canteen object with the provided properties
    this.canteenAdded = true;

    console.log(JSON.stringify(this.canteen));

    // Call the createCanteen method with the new Canteen object
    this.backendService.createCanteen(this.canteen).subscribe(
      (response: boolean) => {
        if (response === true) {
          this.canteenAdded = true;
        } else {
          console.error('Error adding canteen:');
        }
      },
      (error) => {
        console.error('Error adding canteen:', error);
      }
    );
  }

  sendCanteenRequest(): void {
    const canteenRequestData = this.canteenRequestForm.value;

    this.backendService.sendCanteenRequest(canteenRequestData).subscribe({
      next: (response: boolean) => {
        if (response === true) {
          // Canteen request was sent successfully
        } else {
          console.error('Error sending canteen request');
        }
      },
      error: (error) => {
        console.error('Error sending canteen request:', error);
      }
    });
  }
}
