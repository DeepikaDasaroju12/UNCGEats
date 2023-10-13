from fastapi import APIRouter, Depends, HTTPException
import json
from datetime import datetime

# from ..dependencies import get_token_header
from app.utilities.mongo_service import client
from app.utilities.constants import DB_NAME, OWNER_COLLECTION
from app.models.owner_model import Owner

router = APIRouter(
    prefix="/owner",
    tags=["Owner"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

DB = client.get_database(DB_NAME)
COLL = DB.get_collection(OWNER_COLLECTION)

@router.post("/createOwner/")
async def create_owner(owner : Owner):
    try:
        last_id = 0
        last_document_list = list(COLL.find().sort('id', -1).limit(1))
        if (last_document_list):
            last_id = last_document_list[0]["id"]
        owner.id = last_id + 1
        owner.created_time = datetime.now().isoformat()
        owner.last_updated = None
        owner.last_logged = None
        response = COLL.insert_one(json.loads(owner.model_dump_json()))
        output = {"success": False}
        if (response.inserted_id):
            output["success"] = True
            output["insert_id"] = str(response.inserted_id)
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.put("/updateOwner")
async def update_owner(id: int, changes: dict):
    try:
        filter = {"id": id}
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

@router.delete("/deleteOwner")
async def delete_owner(id: int):
    try:
        response = COLL.delete_one({"id": id})
        return {"success": True, "deleted_count": response.deleted_count}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/getOwner")
async def get_owner(id: int):
    try:
        response = COLL.find_one({"id": id})
        response['_id'] = str(response['_id'])
        return response
    except Exception as e:
        return {"error": str(e)}