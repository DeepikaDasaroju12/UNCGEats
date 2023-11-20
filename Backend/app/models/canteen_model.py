from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class CanteenStatusEnum(str, Enum):
    requested = 'requested'
    approved = 'approved'
    rejected = 'rejected'

class Canteen(BaseModel):
    Name : str
    Id : int
    OwnerId : int
    Address : str
    Latitude : Optional[float] = None
    Longitude : Optional[float] = None
    Description : Optional[str] = None
    WorkingHours : str
    AverageRating: Optional[float] = None
    CreatedTime: Optional[datetime] = None
    LastUpdated: Optional[datetime] = None
    Status: Optional[CanteenStatusEnum] = None
    Deleted: Optional[bool] = False
    

class CanteenRegistration(BaseModel):
    Id: int
    Created: datetime
    OwnerId: int
    CanteenId: int
    status: CanteenStatusEnum
    Comments: Optional[str] = None
    

