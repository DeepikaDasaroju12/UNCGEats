// src/app/shared/food-item.model.ts
export enum FoodTypeEnum {
    vg = "vegan",
    v = 'vegetarian',
    nv = 'non-vegetarian'
}

export interface FoodItem {
    Id?: number
    Name: string | null;
    RestaurantId : number
    Description: string | null;
    Price: number | null;
    Image: string | null;
    Reviews: string[] | null;
    AverageRating: number | null;
    FoodType?: FoodTypeEnum; 
    Ingredients: string[] | null;
    Calories: number | null;
    CreatedTime?: Date;
    LastUpdated?: Date
  }
  
  
    
    
    
    
   
