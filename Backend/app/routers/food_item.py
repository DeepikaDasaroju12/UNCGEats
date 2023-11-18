from fastapi import APIRouter, Depends, HTTPException
import json
from datetime import datetime

# from ..dependencies import get_token_header
from utilities.mongo_service import client
from utilities.constants import DB_NAME, FOOD_ITEM_COLLECTION
from models.food_item_model import Food_Item

router = APIRouter(
    prefix="/food_item",
    tags=["Food Item"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

DB = client.get_database(DB_NAME)
COLL = DB.get_collection(FOOD_ITEM_COLLECTION)


@router.post("/createFoodItem/")
async def create_fooditem(food_item: Food_Item):
    try:
        last_id = 0
        last_document_list = list(COLL.find().sort('Id', -1).limit(1))
        if (last_document_list):
            last_id = last_document_list[0]["Id"]
        food_item.Id = last_id + 1
        food_item.CreatedTime = datetime.now().isoformat()
        food_item.LastUpdated = None
        response = COLL.insert_one(json.loads(food_item.model_dump_json()))
        output = {"success": False}
        if (response.inserted_id):
            output["success"] = True
            output["insert_id"] = str(response.inserted_id)
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.put("/updateFoodItem")
async def update_fooditem(Id: int, changes: dict):
    try:
        filter = {"Id": Id}
        changes["last_updated"] = datetime.now().isoformat()
        new_values = {"$set": changes}
        response = COLL.update_one(filter, new_values)
        output = {"success": False}
        if (response.modified_count):
            output["success"] = True
            output["modified_count"] = str(response.modified_count)
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.delete("/deleteFoodItem")
async def delete_fooditem(Id: int):
    try:
        response = COLL.delete_one({"Id": Id})
        return {"success": True, "deleted_count": response.deleted_count}
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.get("/getFoodItem")
async def get_fooditem(Id: int):
    try:
        response = COLL.find_one({"Id": Id})
        response['_id'] = str(response['_id'])
        return response
    except Exception as e:
        return {"error": str(e)}


@router.get("/getCanteenMenu")
async def get_fooditem(Id: int):
    menu = []
    try:
        for response in COLL.find({"RestaurantId": Id}):
            response['_id'] = str(response['_id'])
            menu.append(response)
        return menu
    except Exception as e:
        return {"error": str(e)}
