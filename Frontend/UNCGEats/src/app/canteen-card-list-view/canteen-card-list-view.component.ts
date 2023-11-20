import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { Canteen } from '../models/canteen.model';

@Component({
  selector: 'app-canteen-card-list-view',
  templateUrl: './canteen-card-list-view.component.html',
  styleUrls: ['./canteen-card-list-view.component.css'],
})
export class CanteenCardListViewComponent implements OnInit {
  loggedUser: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'customer',
  };

  canteenList: Canteen[] = [];

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    var isUserLogged = localStorage.getItem('isUserLogged');
    if (isUserLogged == 'true') {
      var userDetails = localStorage.getItem('loggedUser');
      this.loggedUser = JSON.parse(userDetails!.toString()) as User;
      if (this.loggedUser.UserType == 'owner') {
        this.backendService.getCanteensForUser(this.loggedUser.Id!).subscribe({
          next: (response: Canteen[]) => {
            this.canteenList = response;
          },
        });
      } else {
        this.backendService.getAllCanteens().subscribe((result: Canteen[]) => {
          this.canteenList = result;
        });
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  openCanteenMenu(canteen: Canteen) {
    if (this.loggedUser.UserType == 'customer') {
      localStorage.setItem('canteenForMenu', canteen.Id!.toString());
      this.router.navigate(['/userlanding/order', canteen.Id!]);
    }
  }
}
