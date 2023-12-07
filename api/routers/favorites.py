from fastapi import APIRouter, Depends, HTTPException
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


@router.delete("/favorites/{game_id}", response_model=dict)
def delete_wishlist_item(game_id: int, repo: FavoritesRepository = Depends()):
    deleted = repo.delete(game_id)
    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Game not found in favorite"
            )
    return {"message": "Game deleted from favorite"}
