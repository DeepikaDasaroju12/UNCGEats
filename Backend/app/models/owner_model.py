from pydantic import BaseModel
from datetime import datetime
from typing import List


class Owner(BaseModel):
    Name: str | None
    PhoneNumber: int | None
    Email: str | None
    CanteenId : List[int] | None
    Id: int | None
    CreatedTime: datetime | None = None
    LastUpdated: datetime | None = None
    LastLogged: datetime | None = None