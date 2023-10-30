from datetime import datetime
from pydantic import BaseModel
from typing import List
from enum import Enum


class FoodType(str, Enum):
    vg = "vegan"
    v = 'vegetarian'
    nv = 'non-vegetarian'

class Food_Item(BaseModel):
    Id : int | None
    Name : str | None
    RestaurantId : int | None
    Description : str | None
    Price : int | None
    Image : str | None
    Reviews : List[str] | None
    AverageRating : int | None
    FoodType: FoodType
    Ingredients: List[str] | None
    Calories: int | None
    CreatedTime: datetime | None = None
    LastUpdated: datetime | None = None
    LastLogged: datetime | None = None

