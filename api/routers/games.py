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


@router.put("/games/{game_id}", response_model=GameOut)
def update_game(
    game_id: int,
    games: GameIn,
    repo: GameRepository = Depends(),
):
    return repo.update(game_id, games)


@router.delete("/games/{game_id}", response_model=bool)
def delete_game(
    game_id: int,
    repo: GameRepository = Depends(),
) -> bool:
    return repo.delete(game_id)
