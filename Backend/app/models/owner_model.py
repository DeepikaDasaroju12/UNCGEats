from pydantic import BaseModel
from datetime import datetime
from typing import List


class Owner(BaseModel):
    name: str | None
    phoneNumber: int | None
    email_id: str | None
    canteen_Ids : List[int] | None
    id: int | None
    created_time: datetime | None = None
    last_updated: datetime | None = None
    last_logged: datetime | None = None