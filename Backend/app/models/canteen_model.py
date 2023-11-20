from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class CanteenStatusEnum(str, Enum):
    requested = 'Requested'
    approved = 'Approved'
    rejected = 'Rejected'

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
    Status: CanteenStatusEnum = 'Requested'
    Deleted: Optional[bool] = False
    Image: str = ''
    

class CanteenRegistration(BaseModel):
    Id: int
    Created: Optional[datetime] = None
    OwnerId: int
    CanteenId: int
    Status: CanteenStatusEnum = 'Requested'
    Comments: Optional[str] = None
    LastUpdated: Optional[datetime] = None
    

