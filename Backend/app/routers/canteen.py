from email.mime.text import MIMEText
from fastapi import APIRouter, Depends, HTTPException
import json
from datetime import datetime

# from ..dependencies import get_token_header
from utilities.mongo_service import client
from utilities.constants import DB_NAME, CANTEEN_COLLECTION
from models.canteen_model import Canteen

router = APIRouter(
    prefix="/canteen",
    tags=["Canteen"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

DB = client.get_database(DB_NAME)
CANTEEN_COLL = DB.get_collection(CANTEEN_COLLECTION)

@router.post("/createCanteen/")
async def create_canteen(canteen : Canteen):
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
            output["success"] = True
            output["insert_id"] = str(response.inserted_id)
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
        for canteen in CANTEEN_COLL.find({}):
            canteen['_id'] = str(canteen['_id'])
            data.append(canteen)
        return data
    except Exception as e:
        return {"error": str(e)}

canteen_requests = []
@router.post("/createCanteenRequests")
async def create_canteen_request(RequestId: int):
    RequestId = len(canteen_requests) + 1
    canteen_requests.append(RequestId)
    return canteen_requests
    
@router.post("/getCanteenRequest")
async def send_canteen_request(RequestId: int):
    try:
        response = CANTEEN_COLL.find_one({"RequestId": RequestId})
        response['_id'] = str(response['_id'])
        return canteen_requests
    except Exception as e:
        return {"error": str(e)}
    
@router.put("/getCanteenRequest/approve/{RequestId}")
async def approve_canteen_request(RequestId: int):
    for request in canteen_requests:
        if request == RequestId:
            request.approved = True
            return request
    raise HTTPException(status_code=404, detail="Request not found")

@router.put("/getCanteenRequest/reject/{RequestID}")
async def reject_canteen_request(RequestID: int):
    for request in canteen_requests:
        if request == RequestID:
            request.approved = False
            return request
    raise HTTPException(status_code=404, detail="Request not found")

