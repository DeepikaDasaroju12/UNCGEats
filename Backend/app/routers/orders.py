from fastapi import APIRouter, Depends, HTTPException
import json
from datetime import datetime, timedelta
import random

# from ..dependencies import get_token_header
from utilities.mongo_service import client
from utilities.constants import DB_NAME, ORDER_COLLECTION
from models.orders_model import Order

router = APIRouter(
    prefix="/order",
    tags=["Order"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

DB = client.get_database(DB_NAME)
COLL = DB.get_collection(ORDER_COLLECTION)


@router.post("/createOrder/")
async def create_order(order: Order):
    try:
        last_id = 0
        last_document_list = list(COLL.find().sort('Id', -1).limit(1))
        if (last_document_list):
            last_id = last_document_list[0]["Id"]
        order.Id = last_id + 1
        order.OrderDate = datetime.now().isoformat()
        # Adding random mins between 15 to 30 to get pickup time
        randomMinutes = random.randint(15, 30)
        pickupTime = datetime.now() + timedelta(minutes=randomMinutes)
        order.PickupTime = pickupTime.isoformat()
        response = COLL.insert_one(json.loads(order.model_dump_json()))
        output = {"success": False}
        if (response.inserted_id):
            output["success"] = True
            output["insert_id"] = str(response.inserted_id)
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.put("/updateOrder")
async def update_order(Id: int, changes: dict):
    try:
        filter = {"Id": Id}
        changes["LastUpdated"] = datetime.now().isoformat()
        if ('_id' in changes.keys()):
            changes.pop('_id')
        new_values = {"$set": changes}
        response = COLL.update_one(filter, new_values)
        output = {"success": False}
        if (response.modified_count):
            output["success"] = True
            output["modified_count"] = str(response.modified_count)
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.delete("/deleteOrder")
async def delete_order(Id: int):
    try:
        response = COLL.delete_one({"Id": Id})
        return {"success": True, "deleted_count": response.deleted_count}
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.get("/getOrdersForCustomer")
async def get_order(Id: int):
    data = []
    try:
        for order in COLL.find({"CustomerId": Id}):
            order['_id'] = str(order['_id'])
            data.append(order)
        return data
    except Exception as e:
        return {"error": str(e)}


@router.get("/getOrder")
async def get_order(Id: int):
    try:
        response = COLL.find_one({"Id": Id})
        response['_id'] = str(response['_id'])
        return response
    except Exception as e:
        return {"error": str(e)}


@router.get("/getActiveOrdersForCanteen")
async def get_order(Id: int):
    data = []
    active_statuses = [
        'received',
        'confirmed',
        'preparing',
        'prepared',
        'readyToPickup']
    try:
        for order in COLL.find({"CanteenId": Id, "OrderStatus": {"$in": active_statuses}}):
            order['_id'] = str(order['_id'])
            data.append(order)
        return data
    except Exception as e:
        return {"error": str(e)}


@router.get("/getClosedOrdersForCanteen")
async def get_order(Id: int):
    data = []
    closed_statuses = ['canceled', 'pickedUp']
    try:
        for order in COLL.find({"CanteenId": Id, "OrderStatus": {"$in": closed_statuses}}):
            order['_id'] = str(order['_id'])
            data.append(order)
        return data
    except Exception as e:
        return {"error": str(e)}
