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
    id : int | None
    customer_id : int | None
    order_date : datetime | None
    canteen_id : int | None
    food_items : List[int] | None
    total_price : int | None
    total_items : int | None
    order_status : OrderStatusEnum | None
    ordered_time : datetime | None
    pickup_time : datetime | None
    last_updated: datetime | None = None
