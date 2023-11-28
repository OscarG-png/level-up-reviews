from fastapi import APIRouter, Depends
from queries.reviews import ReviewIn, ReviewOut, ReviewRepository
from typing import List


router = APIRouter()


@router.post("/reviews", response_model=ReviewOut)
def create(reviews: ReviewIn, repo: ReviewRepository = Depends()):
    return repo.create(reviews)


@router.get("/reviews", response_model=List[ReviewOut])
def get_all(repo: ReviewRepository = Depends()):
    return repo.get_all()


@router.get("/games/{game_id}/reviews", response_model=List[ReviewOut])
def get_all_reviews(game_id: int, repo: ReviewRepository = Depends()):
    return repo.get_all_for_game(game_id)
