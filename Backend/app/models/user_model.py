from datetime import datetime
from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from enum import Enum


class UserTypeEnum(str, Enum):
    owner = 'owner'
    customer = 'customer'
    admin = 'admin'


class User(BaseModel):
    FirstName: str
    LastName: str
    MiddleName: str
    PhoneNumber: str  # constr(pattern=r'^\(\d{3}\)-\d{3}-\d{4}$')
    Email: EmailStr
    Id: int
    Created: Optional[datetime] = None
    LastUpdated: Optional[datetime] = None
    LastLogged: Optional[datetime] = None
    Password: str
    UserType: UserTypeEnum
