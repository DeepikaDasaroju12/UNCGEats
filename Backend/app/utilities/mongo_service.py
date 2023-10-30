"""
Module to manage Mongo Connection
"""
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb://admin:mongodb@localhost:27017/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    db = client.get_database("test")
    collection = db.get_collection("something")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)