import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services//backend.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Canteen } from '../models/canteen.model';

@Component({
  selector: 'app-user-canteen-list-view',
  templateUrl: './user-canteen-list-view.component.html',
  styleUrls: ['./user-canteen-list-view.component.css'],
})
export class UserCanteenListViewComponent implements OnInit {
  canteenList: Canteen[] = [];
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.backendService.getAllCanteens().subscribe((result: Canteen[]) => {
    this.canteenList = result;

    });
  }
}
