from fastapi import APIRouter, Depends, HTTPException
from queries.wishlist import (
    WishlistCreateOut,
    WishlistIn,
    WishlistRepository,
)

router = APIRouter()


@router.post("/wishlist", response_model=WishlistCreateOut)
def create_favorite(
    wishlist: WishlistIn, repo: WishlistRepository = Depends()
):
    return repo.create_wishlist(wishlist)


@router.get("/users/{user_id}/wishlist", response_model=dict)
def get_user_wishlist(user_id: int, repo: WishlistRepository = Depends()):
    user_wishlist = repo.get_wishlist_for_user(user_id)
    return {
        "user_wishlist": user_wishlist
    }


@router.delete("/wishlist/{game_id}", response_model=dict)
def delete_wishlist_item(game_id: int, repo: WishlistRepository = Depends()):
    deleted = repo.delete(game_id)
    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Game not found in wishlist"
            )
    return {"message": "Game deleted from wishlist"}
