from fastapi import APIRouter, Depends
from queries.game_genres import (
    GameGenreIn,
    GameGenreOut,
    GameGenreRepository,
    GenresForGamesOut,
)
from typing import List


router = APIRouter()


@router.post("/game_genres", response_model=GameGenreOut)
def create_game_genre(
    games: GameGenreIn, repo: GameGenreRepository = Depends()
):
    return repo.create_game_genre(games)


@router.get("/game_genres", response_model=List[GameGenreOut])
def get_all(repo: GameGenreRepository = Depends()):
    return repo.get_all()


@router.get("/games/{game_id}/genres", response_model=List[GenresForGamesOut])
def get_genres_for_game(game_id: int, repo: GameGenreRepository = Depends()):
    return repo.get_genres_for_game(game_id)


@router.get("/genres/{genre_id}/games", response_model=List[GenresForGamesOut])
def get_games_for_genre(genre_id: int, repo: GameGenreRepository = Depends()):
    return repo.get_games_for_genre(genre_id)
