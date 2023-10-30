import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Owner } from '../models/owner.model'; // Import the UserService
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})


export class AdminDashboardComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  loginFailed = false;
  admin : Owner = {
    Name: '',
    Password: '',
    PhoneNumber: 0,
    Email: '',
    CanteenId: []
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
    

  canteenRequests: any = [];

  constructor(private backendService: BackendService, 
    private formBuilder: FormBuilder, 
    private router: Router){}



  // loadCanteenRequests() {
  //   this.backendService.getCanteenRequests().subscribe((data) => {
  //     this.canteenRequests = data;
  //   });
  // }

  // approveRequest(requestId: number) {
  //   this.backendService.approveCanteenRequest(requestId).subscribe(() => {
  //     this.loadCanteenRequests();
  //   });
  // }

  // rejectRequest(requestId: number) {
  //   this.backendService.rejectCanteenRequest(requestId).subscribe(() => {
  //     this.loadCanteenRequests();
  //   });
  // }
}
