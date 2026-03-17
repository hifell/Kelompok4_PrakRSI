from fastapi import FastAPI
from app.routes import items

print("fitur login")

app = FastAPI()

# Health check / root endpoint
@app.get("/")
def root():
    return {"message": "Backend 1 aktif"}

# Include router dari items
app.include_router(items.router)
