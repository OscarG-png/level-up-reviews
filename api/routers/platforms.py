from fastapi import APIRouter, Depends
from queries.platforms import PlatformIn, PlatformOut, PlatformsRepository
from typing import List


router = APIRouter()


@router.post("/platforms", response_model=PlatformOut)
def create_platform(
    platforms: PlatformIn, repo: PlatformsRepository = Depends()
):
    return repo.create(platforms)


@router.get("/platforms", response_model=List[PlatformOut])
def get_all(repo: PlatformsRepository = Depends()):
    return repo.get_all()
