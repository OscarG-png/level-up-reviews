from fastapi import APIRouter, Depends
from queries.favorites import (
    FavoritesIn,
    FavoritesCreateOut,
    FavoritesOut,
    FavoritesRepository,
)
from typing import List

router = APIRouter()


@router.post("/favorites", response_model=FavoritesCreateOut)
def create_favorite(
    favorites: FavoritesIn, repo: FavoritesRepository = Depends()
):
    return repo.create_favorite(favorites)


@router.get("/users/{user_id}/favorites", response_model=List[FavoritesOut])
def get_user_favorites(user_id: int, repo: FavoritesRepository = Depends()):
    return repo.get_favorites_for_user(user_id)
