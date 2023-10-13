from datetime import datetime
from pydantic import BaseModel


class User(BaseModel):
    name: str | None
    phone_number: int | None
    email_id: str | None
    id: int | None = None
    created_time: datetime | None = None
    last_updated: datetime | None = None
    last_logged: datetime | None = None
    