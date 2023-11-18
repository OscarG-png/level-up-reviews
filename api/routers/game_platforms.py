from fastapi import APIRouter, Depends
from queries.game_platforms import (
    GamePlatformIn,
    GamePlatformOut,
    GamePlatformRepository,
    PlatformsForGamesOut,
)
from typing import List


router = APIRouter()


@router.post("/game_platforms", response_model=GamePlatformOut)
def create_game(
    games: GamePlatformIn, repo: GamePlatformRepository = Depends()
):
    return repo.create(games)


@router.get("/games_platforms", response_model=List[GamePlatformOut])
def get_all(repo: GamePlatformRepository = Depends()):
    return repo.get_all()


@router.get(
    "/games/{game_id}/platforms", response_model=List[PlatformsForGamesOut]
)
def get_platforms_for_game(
    game_id: int, repo: GamePlatformRepository = Depends()
):
    return repo.get_platforms_for_game(game_id)


@router.get(
    "/platforms/{platform_id}/games", response_model=List[PlatformsForGamesOut]
)
def get_games_for_platform(
    platform_id: int, repo: GamePlatformRepository = Depends()
):
    return repo.get_games_for_platform(platform_id)
