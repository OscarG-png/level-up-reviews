from pydantic import BaseModel
from queries.pool import pool
from typing import List


class GamePlatformIn(BaseModel):
    game_id: int
    platform_id: int


class GamePlatformOut(BaseModel):
    game_id: int
    platform_id: int


class PlatformsForGamesOut(BaseModel):
    game_id: int
    title: str
    platform_id: int
    name: str


class GamePlatformRepository:
    def create(self, game_platforms: GamePlatformIn) -> GamePlatformOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO game_platforms
                        (game_id, platform_id)
                    VALUES
                        (%s, %s)
                    """,
                    [game_platforms.game_id, game_platforms.platform_id],
                )

                return GamePlatformOut(
                    game_id=game_platforms.game_id,
                    platform_id=game_platforms.platform_id,
                )

    def get_all(self) -> List[GamePlatformOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT game_id, platform_id
                    FROM game_platforms
                    ORDER BY game_id
                    """
                )
                return [
                    GamePlatformOut(game_id=record[0], platform_id=record[1])
                    for record in db
                ]

    def get_platforms_for_game(
        self, game_id: int
    ) -> List[PlatformsForGamesOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT gp.game_id, g.title, gp.platform_id, p.name
                    FROM game_platforms AS gp
                    JOIN games g ON gp.game_id = g.id
                    JOIN platforms p on gp.platform_id = p.id
                    WHERE gp.game_id = %s
                    """,
                    [game_id],
                )
                return [
                    PlatformsForGamesOut(
                        game_id=record[0],
                        title=record[1],
                        platform_id=record[2],
                        name=record[3],
                    )
                    for record in db.fetchall()
                ]

    def get_games_for_platform(
        self, platform_id: int
    ) -> List[PlatformsForGamesOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT gp.game_id, g.title, gp.platform_id, p.name
                    FROM game_platforms AS gp
                    JOIN games g ON gp.game_id = g.id
                    JOIN platforms p on gp.platform_id = p.id
                    WHERE gp.platform_id = %s
                    """,
                    [platform_id],
                )
                return [
                    PlatformsForGamesOut(
                        game_id=record[0],
                        title=record[1],
                        platform_id=record[2],
                        name=record[3],
                    )
                    for record in db.fetchall()
                ]
