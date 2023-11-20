import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { BackendService } from '../services/backend.service';
import { Order, OrderStatusEnum } from '../models/order.model';
import { formatDate } from '@angular/common';
import { FoodItem } from '../models/food-item.model';

@Component({
  selector: 'app-customer-order-history',
  templateUrl: './customer-order-history.component.html',
  styleUrls: ['./customer-order-history.component.css'],
})
export class CustomerOrderHistoryComponent implements OnInit {
  loggedUser: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'customer',
  };
  userOrders: Order[] = [];
  recentOrders: Order[] = [];

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
      this.backendService.getOrderHistory(this.loggedUser.Id!).subscribe({
        next: (response: Order[]) => {
          this.userOrders = response;
          for (let order of this.userOrders) {
            order.formattedDate = formatDate(
              order.OrderDate!,
              'short',
              'en-US'
            );
            order.orderedItemsDetails = [];
            if (
              order.OrderStatus != OrderStatusEnum.canceled &&
              order.OrderStatus != OrderStatusEnum.pickedUp
            ) {
              this.recentOrders.push(order);
            }
            for (let itemData of order.FoodItems!) {
              this.backendService.getFoodItem(itemData.Id).subscribe({
                next: (response: FoodItem) => {
                  order.orderedItemsDetails!.push({
                    Id: itemData.Id,
                    Item: response,
                    Quantity: itemData.Quantity,
                  });
                },
                error: (response: any) => {
                  console.error(response);
                },
              });
            }
          }
        },
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
