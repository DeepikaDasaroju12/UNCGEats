from datetime import datetime
from pydantic import BaseModel


class User(BaseModel):
    Name: str | None
    Password : str | None
    PhoneNumber: int | None
    Email: str | None
    Id: int | None = None
    CreatedTime: datetime | None = None
    LastUpdated: datetime | None = None
    LastLogged: datetime | None = None
    