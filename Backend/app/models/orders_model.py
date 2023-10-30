from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import List

class OrderStatusEnum(str, Enum):
    received = 'received'
    confirmed = 'confirmed'
    preparing = 'preparing'
    prepared = 'prepared'
    ready_to_pickup = 'readyToPickup'

class Order(BaseModel):
    Id : int | None
    CustomerId : int | None
    OrderDate : datetime | None
    CanteenId : int | None
    FoodItems : List[int] | None
    TotalPrice : int | None
    TotalItems : int | None
    OrderStatus : OrderStatusEnum | None
    OrderedTime : datetime | None
    PickupTime : datetime | None
    LastUpdated: datetime | None = None
