from datetime import datetime
from pydantic import BaseModel
from typing import List

class Canteen(BaseModel):
    name : str | None
    id : int | None
    owner_id : int | None
    address : str | None
    latitude : int | None
    longitude : int | None
    food_items : List[int] | None
    description : str | None
    working_hours : int | None
    reviews : List[str] | None
    average_rating: int | None
    created_time: datetime | None = None
    last_updated: datetime | None = None
