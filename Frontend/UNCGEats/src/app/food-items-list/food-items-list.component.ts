import { Component } from '@angular/core';
import { FoodItem } from '../models/food-item';


@Component({
  selector: 'app-food-items-list',
  templateUrl: './food-items-list.component.html',
  styleUrls: ['./food-items-list.component.css']
})
export class FoodItemsListComponent {
  newFooditemTitle : string ="";
  newOrderDate : Date = new Date();
  food_items : FoodItem[] = []

  addFooditem(){
    alert(this.newFooditemTitle + " " + this.newOrderDate)
  }
  

}
