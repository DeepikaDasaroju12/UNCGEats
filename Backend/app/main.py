from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import user, canteen, food_item, orders, owner

app = FastAPI()


ALLOWED_HOSTS = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(canteen.router)
app.include_router(food_item.router)
app.include_router(orders.router)
app.include_router(owner.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/whoisthis")
def returnUserName():
    return "This is Karthik"
