from fastapi import APIRouter, Depends
from queries.wishlist import (
    WishlistOut,
    WishlistCreateOut,
    WishlistIn,
    WishlistRepository,
)
from typing import List

router = APIRouter()


@router.post("/wishlist", response_model=WishlistCreateOut)
def create_favorite(
    wishlist: WishlistIn, repo: WishlistRepository = Depends()
):
    return repo.create_wishlist(wishlist)


@router.get("/users/{user_id}/wishlist", response_model=List[WishlistOut])
def get_user_wishlist(user_id: int, repo: WishlistRepository = Depends()):
    return repo.get_wishlist_for_user(user_id)
