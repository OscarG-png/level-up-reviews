from fastapi import APIRouter, Depends
from queries.games import GameIn, GameOut, GameRepository
from typing import List


router = APIRouter()


@router.post("/games", response_model=GameOut)
def create_game(
    games: GameIn,
    repo: GameRepository = Depends()
):
    return repo.create(games)


@router.get("/games", response_model=List[GameOut])
def get_all(
    repo: GameRepository = Depends()
):
    return repo.get_all()
