from fastapi import APIRouter, Depends, HTTPException
import json
from datetime import datetime

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
async def create_order(order : Order):
    try:
        last_id = 0
        last_document_list = list(COLL.find().sort('Id', -1).limit(1))
        if (last_document_list):
            last_id = last_document_list[0]["Id"]
        order.Id = last_id + 1
        order.OrderedTime = datetime.now().isoformat()
        order.PickupTime = datetime.now().isoformat()
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

@router.get("/getOrder")
async def get_order(Id: int):
    try:
        response = COLL.find_one({"Id": Id})
        response['_id'] = str(response['_id'])
        return response
    except Exception as e:
        return {"error": str(e)}