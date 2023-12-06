from fastapi import APIRouter, Depends
from queries.platforms import PlatformIn, PlatformOut, PlatformsRepository


router = APIRouter()


@router.post("/platforms", response_model=PlatformOut)
def create_platform(
    platforms: PlatformIn, repo: PlatformsRepository = Depends()
):
    return repo.create(platforms)


@router.get("/platforms", response_model=dict)
def get_all(repo: PlatformsRepository = Depends()):
    platforms = repo.get_all()
    return {
        "platforms": platforms
    }
