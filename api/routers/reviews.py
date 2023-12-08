from fastapi import APIRouter, Depends
from queries.reviews import (
    ReviewIn,
    ReviewOut,
    ReviewRepository,
    GameRatingOut,
)
from typing import List
from authenticator import authenticator


router = APIRouter()


@router.post("/reviews", response_model=ReviewOut)
def create(
    reviews: ReviewIn,
    repo: ReviewRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(reviews)


@router.get("/reviews", response_model=dict)
def get_all(repo: ReviewRepository = Depends()):
    reviews = repo.get_all()
    return {
        "reviews": reviews
    }


@router.get("/games/{game_id}/reviews", response_model=dict)
def get_all_reviews(game_id: int, repo: ReviewRepository = Depends()):
    reviews = repo.get_all_for_game(game_id)
    return {
        "reviews": reviews
    }


@router.get("/games/toprated", response_model=List[GameRatingOut])
def get_top_rated(repo: ReviewRepository = Depends()):
    return repo.get_top_rated_games()


@router.get("/users/{user_id}/reviews", response_model=dict)
def get_user_reviews(user_id: int, repo: ReviewRepository = Depends()):
    user_reviews = repo.get_reviews_for_user(user_id)
    return {
        "user_reviews": user_reviews
    }
