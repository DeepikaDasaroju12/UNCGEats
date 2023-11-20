from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import List, Optional


class OrderStatusEnum(str, Enum):
    received = 'received'
    confirmed = 'confirmed'
    preparing = 'preparing'
    prepared = 'prepared'
    ready_to_pickup = 'readyToPickup'
    canceled = 'canceled'


class Order(BaseModel):
    Id: int
    CustomerId: int
    OrderDate: datetime
    CanteenId: int
    FoodItems: List[dict]
    TotalPrice: float
    TotalItems: int
    OrderStatus: OrderStatusEnum
    PickupTime: Optional[datetime] = None
    LastUpdated: Optional[datetime] = None
