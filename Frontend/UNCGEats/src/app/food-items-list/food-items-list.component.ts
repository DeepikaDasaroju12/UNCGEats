// food-items-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FoodItem, FoodTypeEnum } from '../models/food-item.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, OrderStatusEnum } from '../models/order.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-food-items-list',
  templateUrl: './food-items-list.component.html',
  styleUrls: ['./food-items-list.component.css'],
})
export class FoodItemsListComponent implements OnInit {
  foodItemForm: FormGroup = new FormGroup({});
  canteenId: number = -1;
  menuItems: FoodItem[] = [];
  menuQuantity: number[] = [];
  shoppingCart = new Map<FoodItem, number>();
  cartItems: number = 0;
  showTotal: boolean = false;
  totalPrice: number = 0;
  loggedUser: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'customer',
  };

  order: Order = {
    Id: -1,
    CustomerId: -1,
    CanteenId: -1,
    FoodItems: [],
    TotalPrice: 0,
    TotalItems: 0,
    OrderStatus: OrderStatusEnum.received,
  };


  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    var id = localStorage.getItem('canteenForMenu');
    var userDetails = localStorage.getItem('loggedUser');
    this.loggedUser = JSON.parse(userDetails!.toString()) as User;
    this.canteenId = Number(id);
    this.backendService.getCanteenMenu(this.canteenId).subscribe({
      next: (response: FoodItem[]) => {
        this.menuItems = response;
        this.menuQuantity = Array<number>(this.menuItems.length).fill(0);
        console.log(this.menuItems);
      },
    });
  }

  increaseQuantity(index: number) {
    this.menuQuantity[index] = this.menuQuantity[index] + 1;
    this.shoppingCart.set(this.menuItems[index], this.menuQuantity[index]);
    this.cartItems = 0;
    this.showTotal = false;
    this.totalPrice = 0;
    for (let foodItem of this.shoppingCart.keys()) {
      this.cartItems = this.cartItems + this.shoppingCart.get(foodItem)!;
      this.totalPrice =
        this.totalPrice + this.shoppingCart.get(foodItem)! * foodItem.Price!;
    }
    if (this.cartItems > 0) {
      this.showTotal = true;
    }
  }

  decreaseQuantity(index: number) {
    this.cartItems = 0;
    this.showTotal = false;
    if (this.menuQuantity[index] != 0) {
      this.menuQuantity[index] = this.menuQuantity[index] - 1;
    }
    this.shoppingCart.set(this.menuItems[index], this.menuQuantity[index]);
    if (this.shoppingCart.get(this.menuItems[index]) == 0) {
      this.shoppingCart.delete(this.menuItems[index]);
    }
    this.totalPrice = 0;
    for (let foodItem of this.shoppingCart.keys()) {
      this.cartItems = this.cartItems + this.shoppingCart.get(foodItem)!;
      this.totalPrice =
        this.totalPrice + this.shoppingCart.get(foodItem)! * foodItem.Price!;
    }
    if (this.cartItems > 0) {
      this.showTotal = true;
    }
  }

  placeOrder() {
    this.order.CanteenId = this.canteenId;
    this.order.CustomerId = this.loggedUser.Id!;
    this.order.TotalItems = this.cartItems;
    this.order.TotalPrice = this.totalPrice;
    this.order.OrderDate = new Date();
    this.order.FoodItems = [];
    for (let foodItem of this.shoppingCart.keys()) {
      this.order.FoodItems!.push({
        Id: foodItem.Id!,
        Quantity: this.shoppingCart.get(foodItem)!,
      });
    }
    console.log(JSON.stringify(this.order));
    this.backendService.createOrder(this.order).subscribe({
      next: (response) => {
        console.log(response);
        if(response['success']==true) {
         this.router.navigate(['/userlanding/orderHistory'])
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
