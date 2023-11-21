from fastapi import APIRouter, Depends, HTTPException, Query
import json
from datetime import datetime

# from ..dependencies import get_token_header
from utilities.mongo_service import client
from utilities.constants import DB_NAME, USER_COLLECTION
from models.user_model import User, UserTypeEnum

router = APIRouter(
    prefix="/user",
    tags=["User"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

DB = client.get_database(DB_NAME)
COLL = DB.get_collection(USER_COLLECTION)


@router.post("/createUser/")
async def create_user(user: User):
    try:
        last_id = 0
        last_document_list = list(COLL.find().sort('Id', -1).limit(1))
        if (last_document_list):
            last_id = last_document_list[0]["Id"]
        user.Id = last_id + 1
        user.Created = datetime.now().isoformat()
        user.LastLogged = None
        user.LastUpdated = None
        response = COLL.insert_one(json.loads(user.model_dump_json()))
        output = {"success": False}
        if (response.inserted_id):
            output["success"] = True
            output["insert_id"] = str(response.inserted_id)
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.put("/updateUser")
async def update_user(Id: int, changes: dict):
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


@router.put("/updateUserLastLogged")
async def update_user_last_logged(Id: int):
    try:
        filter = {"Id": Id}
        changes = {"LastLogged": datetime.now().isoformat()}
        new_values = {"$set": changes}
        response = COLL.update_one(filter, new_values)
        output = {"success": False}
        if (response.modified_count):
            output["success"] = True
            output["modified_count"] = str(response.modified_count)
        return output
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.delete("/deleteUser")
async def delete_user(Id: int):
    try:
        response = COLL.delete_one({"Id": Id})
        return {"success": True, "deleted_count": response.deleted_count}
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.get("/getUser")
async def get_user(Id: int):
    try:
        response = COLL.find_one({"Id": Id})
        response['_id'] = str(response['_id'])
        return response
    except Exception as e:
        return {"error": str(e)}


@router.get("/getAllUsers")
async def get_all_users():
    data = []
    try:
        for response in COLL.find({"UserType": 'customer'}):
            response['_id'] = str(response['_id'])
            data.append(response)
        return data
    except Exception as e:
        return {"error": str(e)}
    

@router.get("/getAllOwners")
async def get_all_owners():
    data = []
    try:
        for response in COLL.find({"UserType": 'owner'}):
            response['_id'] = str(response['_id'])
            data.append(response)
        return data
    except Exception as e:
        return {"error": str(e)}
    

@router.get("/getAllAdmins")
async def get_all_admins():
    data = []
    try:
        for response in COLL.find({"UserType": 'admin'}):
            response['_id'] = str(response['_id'])
            data.append(response)
        return data
    except Exception as e:
        return {"error": str(e)}

@router.get("/isEmailExists/")
async def isEmailExists(Email: str):
    # Check if the email exists in the list of users
    try:
        response = COLL.find_one({"Email": Email})
        print(response)
        if response is not None:
            return True
        else:
            return False
    except Exception as e:
        return {"error": str(e)}


@router.get("/isUserValid/")
async def isUserValid(Email: str, Password: str, UserType: UserTypeEnum):
    # Check if the user is valid or not
    try:
        response = COLL.find_one(
            {"Email": Email, "Password": Password, "UserType": UserType})
        print(response)
        if response is not None:
            return True
        else:
            return False
    except Exception as e:
        return {"error": str(e)}


@router.get("/loginUser/")
async def loginUser(Email: str, Password: str, UserType: UserTypeEnum):
    # Check if the user is valid or not
    user_exists = False
    try:
        response = COLL.find_one(
            {"Email": Email, "Password": Password, "UserType": UserType})
        print(response)
        if response is not None:
            user_exists = True
            response["_id"] = str(response['_id'])
        else:
            user_exists = False
            response = "Invalid Credentials"

        return {
            "loginResponse": user_exists,
            "userData": response
        }
    except Exception as e:
        return {"error": str(e)}
