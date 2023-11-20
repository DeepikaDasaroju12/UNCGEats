import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Canteen } from '../models/canteen.model';
import { FoodItem, FoodTypeEnum } from '../models/food-item.model';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';
import { Order, OrderStatusEnum } from '../models/order.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  ordersTableHeaders = ['Order Id', 'Date', 'Status'];
  activeCanteenOrders: Order[] = [];
  closedCanteenOrders: Order[] = [];
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  loggedUser: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'owner',
  };
  canteenList: Canteen[] = [];
  selectedCanteen: number = -1;
  selectedOrder: Order = {
    Id: -1,
    CustomerId: -1,
    CanteenId: -1,
    FoodItems: [{ Id: -1, Quantity: 0 }],
    TotalPrice: 0,
    TotalItems: 0,
    OrderStatus: OrderStatusEnum.received,
  };

  orderStatusList: OrderStatusEnum[] = [
    OrderStatusEnum.canceled,
    OrderStatusEnum.received,
    OrderStatusEnum.confirmed,
    OrderStatusEnum.preparing,
    OrderStatusEnum.prepared,
    OrderStatusEnum.readyToPickup,
    OrderStatusEnum.pickedUp,
  ];
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
      }
    } else {
      this.router.navigate(['/']);
    }
  }
  getCanteenOrders() {
    this.backendService.getActiveCanteenOrders(this.selectedCanteen).subscribe({
      next: (response: Order[]) => {
        console.log(response);
        this.activeCanteenOrders = response;
        for (let order of this.activeCanteenOrders) {
          order.formattedDate = formatDate(order.OrderDate!, 'short', 'en-US');
          order.orderedItemsDetails = [];
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
    this.backendService.getClosedCanteenOrders(this.selectedCanteen).subscribe({
      next: (response: Order[]) => {
        console.log(response);
        this.closedCanteenOrders = response;
        for (let order of this.closedCanteenOrders) {
          order.formattedDate = formatDate(order.OrderDate!, 'short', 'en-US');
          order.orderedItemsDetails = [];
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
  }

  updateOrderStatus(order: Order, value: OrderStatusEnum) {
    order.OrderStatus = value;
    this.backendService.updateOrder(order.Id!, order).subscribe({
      next: (response: any) => {
        this.getCanteenOrders();
      },
    });
  }
}
