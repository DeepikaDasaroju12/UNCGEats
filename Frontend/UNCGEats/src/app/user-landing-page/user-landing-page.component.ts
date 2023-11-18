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
  selectedEntry: string = 'View Canteens';
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
      'Delete Canteen': 'bi bi-building-fill-dash',
    })
  );
  customerMenu: Map<string, string> = new Map(
    Object.entries({
      'View Canteens': 'bi bi-buildings',
      'View Order History': 'bi bi-cake2-fill',
      'View Order Status': 'bi bi-building-fill-exclamation',
    })
  );

  adminMenu: Map<string, string> = new Map(
    Object.entries({
      'View Canteens': 'bi bi-buildings',
      'Add/Edit Menu': 'bi bi-menu-up',
      'View Orders': 'bi bi-cake2-fill',
      'Submit New Canteen Request': 'bi bi-building-fill-add',
      'View Canteen Request Status': 'bi bi-building-fill-exclamation',
      'Delete Canteen': 'bi bi-building-fill-dash',
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
    console.log(value);
    this.selectedEntry = value;
  }
}
