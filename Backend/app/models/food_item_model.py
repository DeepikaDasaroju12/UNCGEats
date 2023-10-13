from datetime import datetime
from pydantic import BaseModel
from typing import List
from enum import Enum


class FoodType(str, Enum):
    vg = "vegan"
    v = 'vegetarian'
    nv = 'non-vegetarian'

class Food_Item(BaseModel):
    id : int | None
    name : str | None
    restaurant_id : int | None
    description : str | None
    price : int | None
    image : str | None
    reviews : List[str] | None
    average_rating : int | None
    food_type: FoodType
    ingredients: List[str] | None
    calories: int | None
    created_time: datetime | None = None
    last_updated: datetime | None = None

