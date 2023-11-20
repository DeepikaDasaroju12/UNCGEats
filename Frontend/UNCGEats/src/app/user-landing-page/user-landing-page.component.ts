import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services//backend.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Canteen } from '../models/canteen.model';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css'],
})
export class UserLandingPageComponent implements OnInit {
  loggedUser: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'customer',
  };

  ownerMenu: Map<string, string> = new Map(
    Object.entries({
      'View Canteens': 'bi bi-buildings',
      'Add/Edit Menu': 'bi bi-menu-up',
      'View Orders': 'bi bi-cake2-fill',
      'Submit New Canteen Request': 'bi bi-building-fill-add',
      'View Canteen Request Status': 'bi bi-building-fill-exclamation',
      'Edit/Delete Canteen': 'bi bi-building-fill-dash',
    })
  );
  customerMenu: Map<string, string> = new Map(
    Object.entries({
      'View Canteens': 'bi bi-buildings',
      'View Order History/Status': 'bi bi-building-fill-exclamation',
    })
  );

  adminMenu: Map<string, string> = new Map(
    Object.entries({
      'View Canteens': 'bi bi-buildings',
      'View Owners': 'bi bi-menu-up',
      'View Users': 'bi bi-cake2-fill',
      'New Canteen Requests': 'bi bi-building-fill-add',
    })
  );

  menuItems: Map<string, string> = new Map(Object.entries({}));

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    var isUserLogged = localStorage.getItem('isUserLogged');
    if (isUserLogged == 'true') {
      var userDetails = localStorage.getItem('loggedUser');
      this.loggedUser = JSON.parse(userDetails!.toString()) as User;
      if (this.loggedUser.UserType == 'owner') {
        this.menuItems = this.ownerMenu;
      } else if (this.loggedUser.UserType == 'customer') {
        this.menuItems = this.customerMenu;
      } else if (this.loggedUser.UserType == 'admin') {
        this.menuItems = this.adminMenu;
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  listNavigate(value: string) {
    if (value == 'View Canteens') {
      this.router.navigate(['/userlanding/viewCanteens']);
    } else if (value == 'View Order History/Status') {
      this.router.navigate(['/userlanding/orderHistory']);
    } else if (value == 'Add/Edit Menu') {
      this.router.navigate(['/userlanding/manageMenu']);
    } else if (value == 'View Orders') {
      this.router.navigate(['/userlanding/manageOrders']);
    } else if (value == 'Submit New Canteen Request') {
      this.router.navigate(['/userlanding/requestNewCanteen']);
    } else if (value == 'View Canteen Request Status') {
      this.router.navigate(['/userlanding/canteenRequestStatus']);
    } else if (value == 'Edit/Delete Canteen') {
      this.router.navigate(['/userlanding/manageCanteen']);
    } else if (value == 'View Owners') {
      this.router.navigate(['/userlanding/viewAllOwners']);
    } else if (value == 'View Customers') {
      this.router.navigate(['/userlanding/viewAllCustomers']);
    } else if (value == 'New Canteen Requests') {
      this.router.navigate(['/userlanding/manageCanteenRequests']);
    }
  }

  logOut() {
    localStorage.setItem('isUserLogged', 'false');
    this.router.navigate(['/']);
  }

  deleteUser() {}
}
