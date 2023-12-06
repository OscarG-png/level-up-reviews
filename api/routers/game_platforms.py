from fastapi import APIRouter, Depends
from queries.game_platforms import (
    GamePlatformIn,
    GamePlatformOut,
    GamePlatformRepository,
)

router = APIRouter()


@router.post("/game_platforms", response_model=GamePlatformOut)
def create_game(
    games: GamePlatformIn, repo: GamePlatformRepository = Depends()
):
    return repo.create(games)


@router.get("/games_platforms", response_model=dict)
def get_all(repo: GamePlatformRepository = Depends()):
    platforms = repo.get_all()
    return {
        "platforms": platforms
    }


@router.get(
    "/games/{game_id}/platforms", response_model=dict
)
def get_platforms_for_game(
    game_id: int, repo: GamePlatformRepository = Depends()
):
    platform_games = repo.get_platforms_for_game(game_id)
    return {
        "platform_games": platform_games
    }


@router.get(
    "/platforms/{platform_id}/games", response_model=dict
)
def get_games_for_platform(
    platform_id: int, repo: GamePlatformRepository = Depends()
):
    games_platforms = repo.get_games_for_platform(platform_id)
    return {
        "games_platforms": games_platforms
    }
