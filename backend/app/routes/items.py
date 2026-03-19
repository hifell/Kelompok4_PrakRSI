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

@router.put("/items/{index}", response_model=ItemResponse)
def update_item(index: int, item: Item):
    if 0 <= index < len(items_db):
        items_db[index] = item.name
        return {"items": items_db}
    return {"items": items_db}


@router.delete("/items/{index}", response_model=ItemResponse)
def delete_item(index: int):
    if 0 <= index < len(items_db):
        items_db.pop(index)
        return {"items": items_db}
    return {"items": items_db}