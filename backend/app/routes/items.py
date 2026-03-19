from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

items_db = []

class Item(BaseModel):
    name: str

class ItemResponse(BaseModel):
    items: List[str]

@router.get("/items", response_model=ItemResponse)
def get_items():
    return {"items": items_db}

@router.post("/items", response_model=ItemResponse)
def create_item(item: Item):
    items_db.append(item.name)
    return {"items": items_db}
