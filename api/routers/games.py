from fastapi import APIRouter, Depends
from queries.games import GameIn, GameRepository


router = APIRouter()


@router.post("/games")
def create_game(
    games: GameIn,
    repo: GameRepository = Depends()
):
    return repo.create(games)
