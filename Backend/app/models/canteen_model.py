from datetime import datetime
from pydantic import BaseModel
from typing import List

class Canteen(BaseModel):
    Name : str | None
    Id : int | None
    OwnerId : int | None
    Address : str | None
    Latitude : int | None
    Longitude : int | None
    FoodItems : List[int] | None
    Description : str | None
    WorkingHours : int | None
    Reviews : List[str] | None
    AverageRating: int | None
    CreatedTime: datetime | None = None
    LastUpdated: datetime | None = None
    LastLogged: datetime | None = None
