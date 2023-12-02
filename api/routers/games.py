from fastapi import APIRouter, Depends, Response
from queries.games import GameIn, GameOut, GameRepository
from typing import Union


router = APIRouter()


@router.post("/games", response_model=GameOut)
def create_game(games: GameIn, repo: GameRepository = Depends()):
    return repo.create(games)


@router.get("/games", response_model=dict)
def get_all(
    repo: GameRepository = Depends()
):
    games = repo.get_all()
    return {
        "games": games
    }


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


@router.get("/games/{game_id}", response_model=Union[GameOut, None])
def get_one_game(
    game_id: int,
    response: Response,
    repo: GameRepository = Depends(),
) -> GameOut:
    game = repo.get_one_game(game_id)
    if game is None:
        response.status_code = 404
    return game
