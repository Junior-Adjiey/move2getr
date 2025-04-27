from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from db import get_session
from models.resource import Resource
from schemas.resource import ResourceCreate, ResourceRead, ResourceUpdate
from routers.auth import get_current_user
from models.account import Account
from dependencies.auth_utils import require_admin
from typing import List

router = APIRouter(
    prefix="/resources",
    tags=["Resources"]
)

# 📦 Create a new resource
@router.post("/", response_model=ResourceRead)
def create_resource(
    resource_data: ResourceCreate,
    current_user: Account = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    resource = Resource(**resource_data.dict())
    session.add(resource)
    session.commit()
    session.refresh(resource)
    return resource

# 📋 List all resources
@router.get("/", response_model=List[ResourceRead])
def list_resources(session: Session = Depends(get_session)):
    resources = session.exec(
        select(Resource).order_by(Resource.created_at.desc())
    ).all()
    return resources

# 📄 Get a specific resource by ID
@router.get("/{resource_id}", response_model=ResourceRead)
def get_resource(resource_id: int, session: Session = Depends(get_session)):
    resource = session.get(Resource, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

# ✏️ Update an existing resource
@router.put("/{resource_id}", response_model=ResourceRead)
def update_resource(
    resource_id: int,
    resource_update: ResourceUpdate,
    session: Session = Depends(get_session),
    current_user: Account = Depends(get_current_user)
):
    resource = session.get(Resource, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    update_data = resource_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(resource, key, value)

    session.add(resource)
    session.commit()
    session.refresh(resource)
    return resource

# ❌ Delete a resource (admin only)
@router.delete("/{resource_id}")
def delete_resource(
    resource_id: int,
    session: Session = Depends(get_session),
    current_user: Account = Depends(require_admin)
):
    resource = session.get(Resource, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    session.delete(resource)
    session.commit()
    return {"detail": "Resource deleted successfully"}



