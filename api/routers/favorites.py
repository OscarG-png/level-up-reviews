from fastapi import APIRouter, Depends
from queries.favorites import (
    FavoritesIn,
    FavoritesCreateOut,
    FavoritesRepository,
)

router = APIRouter()


@router.post("/favorites", response_model=FavoritesCreateOut)
def create_favorite(
    favorites: FavoritesIn, repo: FavoritesRepository = Depends()
):
    return repo.create_favorite(favorites)


@router.get("/users/{user_id}/favorites", response_model=dict)
def get_user_favorites(user_id: int, repo: FavoritesRepository = Depends()):
    favorites = repo.get_favorites_for_user(user_id)
    return {
        "favorites": favorites
    }
