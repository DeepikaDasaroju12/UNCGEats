from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class FoodType(str, Enum):
    vg = "vegan"
    v = 'vegetarian'
    nv = 'non-vegetarian'

class Food_Item(BaseModel):
    Id : int 
    Name : str 
    Description : Optional[str] = None
    Price : float 
    Image : str 
    AverageRating : Optional[float] = None
    FoodType: FoodType
    Ingredients: Optional[List[str]] = None
    Calories: Optional[int] = None
    CreatedTime: Optional[datetime] = None
    LastUpdated: Optional[datetime] = None
    RestaurantId: int


class Menu(BaseModel):
    Id: int
    CanteenId: int
    Items: List[int]
    


class FoodReviews(BaseModel):
    Id: int
    UserId: int
    ItemId: int
    Rating: float
    Comments: Optional[str]


class CanteenReviews(BaseModel):
    Id: int
    UserId: int
    CanteenId: int
    Rating: float
    Comments: Optional[str]