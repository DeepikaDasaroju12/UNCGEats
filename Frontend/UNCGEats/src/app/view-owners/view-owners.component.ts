import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-owners',
  templateUrl: './view-owners.component.html',
  styleUrls: ['./view-owners.component.css'],
})
export class ViewOwnersComponent implements OnInit {
  constructor(private backendService: BackendService, private router: Router) {}
  userList: User[] = [];
  ownerList: User[] = [];
userTableHeader = [
  'Name', 'Phone Number', 'Email', 'Created', 'LastUpdated'
];
  ngOnInit(): void {
    var isUserLogged = localStorage.getItem('isUserLogged');
    if (isUserLogged == 'true') {
      this.backendService.getAllUsers().subscribe({
        next: (response: User[]) => {
          this.userList = response;
        },
      });
      this.backendService.getAllOwners().subscribe({
        next: (response: User[]) => {
          this.ownerList = response;
        },
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
