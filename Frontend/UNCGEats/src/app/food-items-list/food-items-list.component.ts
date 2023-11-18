// food-items-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FoodItem, FoodTypeEnum } from '../models/food-item.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-items-list',
  templateUrl: './food-items-list.component.html',
  styleUrls: ['./food-items-list.component.css']
})
export class FoodItemsListComponent implements OnInit {
  foodItemForm: FormGroup = new FormGroup({});
  back : boolean = false;
  foodItem: FoodItem = {
    Name: '',
    RestaurantId: 0,
    Description: '',
    Price: 0,
    Image: '',
    Reviews: [],
    AverageRating: 0,
    FoodType: FoodTypeEnum.vg,
    Ingredients: '',
    Calories: 0,
  };


  constructor(private backendService: BackendService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {

    this.foodItemForm = this.formBuilder.group({
      Name: ['', Validators.required],
      RestaurantId: [0, Validators.required],
      Description: ['', Validators.required],
      Price: [0, Validators.required],
      Image: [''],
      AverageRating: [0, Validators.required],
      FoodType: [FoodTypeEnum.vg, Validators.required],
      Ingredients: [''],
      Calories: [0],
    });

  }

  goBack() {
    this.back = true;
  }
}
