from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None

@app.get("/")
def root():
    return {"message": "Backend Kelompok 4 Aktif"}

# Backend 1
@app.get("/items")
def get_items():
    return {"data": ["item1", "item2", "item3"]}

@app.post("/items")
def create_item(item: Item):
    return {"message": "Item berhasil dibuat", "item": item}

