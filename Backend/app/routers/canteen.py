from email.mime.text import MIMEText
from fastapi import APIRouter, Depends, HTTPException
import json
from datetime import datetime

# from ..dependencies import get_token_header
from utilities.mongo_service import client
from utilities.constants import DB_NAME, CANTEEN_COLLECTION, CANTEEN_REGISTRATIONS_COLLECTION
from models.canteen_model import Canteen, CanteenRegistration

router = APIRouter(
    prefix="/canteen",
    tags=["Canteen"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

DB = client.get_database(DB_NAME)
CANTEEN_COLL = DB.get_collection(CANTEEN_COLLECTION)
CANTEEN_REG_COLL = DB.get_collection(CANTEEN_REGISTRATIONS_COLLECTION)

@router.post("/createCanteen/")
async def create_canteen(canteen: Canteen, canteenRequest: CanteenRegistration):
    try:
        last_id = 0
        last_document_list = list(CANTEEN_COLL.find().sort('Id', -1).limit(1))
        if (last_document_list):
            last_id = last_document_list[0]["Id"]
        canteen.Id = last_id + 1
        canteen.CreatedTime = datetime.now().isoformat()
        canteen.LastUpdated = None
        response = CANTEEN_COLL.insert_one(json.loads(canteen.model_dump_json()))
        output = {"success": False}
        if (response.inserted_id):
            output["success_create_canteen"] = True
            output["canteen_insert_id"] = str(response.inserted_id)
        last_id = 0
        last_document_list = list(CANTEEN_REG_COLL.find().sort('Id', -1).limit(1))
        if (last_document_list):
            last_id = last_document_list[0]["Id"]
        canteenRequest.Id = last_id + 1
        canteenRequest.Created = datetime.now().isoformat()
        canteenRequest.CanteenId = canteen.Id
        response = CANTEEN_REG_COLL.insert_one(json.loads(canteenRequest.model_dump_json()))
        if (response.inserted_id):
            output["success_create_request"] = True
            output["request_insert_id"] = str(response.inserted_id)
        output['success'] = True
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.put("/updateCanteen")
async def update_canteen(Id: int, changes: dict):
    try:
        filter = {"Id": Id}
        changes["LastUpdated"] = datetime.now().isoformat()
        new_values = {"$set": changes}
        response = CANTEEN_COLL.update_one(filter, new_values)
        output = {"success": False}
        if (response.modified_count):
            output["success"] = True
            output["modified_count"] = str(response.modified_count)
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}
    

@router.put("/approveOrRejectCanteen")
async def update_canteen(Id: int, changes: dict):
    try:
        filter = {"Id": Id}
        canteen_changes = changes['CanteenChanges']
        canteen_changes["LastUpdated"] = datetime.now().isoformat()
        new_values = {"$set": canteen_changes}
        response = CANTEEN_COLL.update_one(filter, new_values)
        output = {"success": False}
        if (response.modified_count):
            output["canteen_success"] = True
            output["canteen_modified_count"] = str(response.modified_count)
        filter = {"CanteenId": Id}
        request_changes = changes['RequestChanges']
        request_changes["LastUpdated"] = datetime.now().isoformat()
        new_values = {"$set": request_changes}
        response = CANTEEN_REG_COLL.update_one(filter, new_values)
        if (response.modified_count):
            output["request_success"] = True
            output["request_modified_count"] = str(response.modified_count)
        output['success'] = True
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.delete("/deleteCanteen")
async def delete_canteen(Id: int):
    try:
        response = CANTEEN_COLL.delete_one({"Id": Id})
        return {"success": True, "deleted_count": response.deleted_count}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/getCanteen")
async def get_canteen(Id: int):
    try:
        response = CANTEEN_COLL.find_one({"Id": Id})
        response['_id'] = str(response['_id'])
        return response
    except Exception as e:
        return {"error": str(e)}
    
@router.get("/getAllCanteens")
async def get_all_canteens():
    data = []
    try:
        for canteen in CANTEEN_COLL.find({'Status': 'Approved'}):
            canteen['_id'] = str(canteen['_id'])
            data.append(canteen)
        return data
    except Exception as e:
        return {"error": str(e)}
    

@router.get("/getAllCanteensForUser")
async def get_all_canteens_for_user(Id : int):
    data = []
    try:
        for canteen in CANTEEN_COLL.find({"OwnerId": Id, 'Status': 'Approved'}):
            canteen['_id'] = str(canteen['_id'])
            data.append(canteen)
        return data
    except Exception as e:
        return {"error": str(e)}


@router.get("/getPendingCanteensForOwner")
async def get_pending_canteens_for_owner(Id: int):
    data = []
    try:
        for canteen in CANTEEN_COLL.find({"OwnerId": Id, 'Status': 'Requested'}):
            canteen['_id'] = str(canteen['_id'])
            data.append(canteen)
        return data
    except Exception as e:
        return {"error": str(e)}


@router.get("/getRejectedCanteensForOwner")
async def get_rejected_canteens_for_owner(Id: int):
    data = []
    try:
        for canteen in CANTEEN_COLL.find({"OwnerId": Id, 'Status': 'Rejected'}):
            canteen['_id'] = str(canteen['_id'])
            data.append(canteen)
        return data
    except Exception as e:
        return {"error": str(e)}
    

@router.get("/getAllCanteensRequests")
async def get_all_canteens_for_user(Id: int):
    data = []
    try:
        for canteen in CANTEEN_REG_COLL.find({}):
            canteen['_id'] = str(canteen['_id'])
            data.append(canteen)
        return data
    except Exception as e:
        return {"error": str(e)}


@router.get("/getAllCanteensRequests")
async def get_all_canteens_for_user(Id: int):
    data = []
    try:
        for canteen in CANTEEN_COLL.find({'Status': 'Requested'}):
            canteen['_id'] = str(canteen['_id'])
            data.append(canteen)
        return data
    except Exception as e:
        return {"error": str(e)}


