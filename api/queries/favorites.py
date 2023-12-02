from pydantic import BaseModel
from queries.pool import pool
from typing import List
from datetime import date


class FavoritesIn(BaseModel):
    game_id: int
    user_id: int


class FavoritesCreateOut(BaseModel):
    game_id: int
    user_id: int


class FavoritesOut(BaseModel):
    game_id: int
    title: str
    release_date: date
    esrb_rating: str
    user_id: int


class FavoritesRepository:
    def create_favorite(self, favorites: FavoritesIn) -> FavoritesCreateOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO favorites
                    VALUES (%s, %s)
                    """,
                    [favorites.user_id, favorites.game_id],
                )

                return FavoritesCreateOut(
                    user_id=favorites.user_id, game_id=favorites.game_id
                )

    def get_favorites_for_user(self, user_id: int) -> List[FavoritesOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT f.game_id, g.title, g.release_date,
                    g.esrb_rating, f.user_id
                    FROM favorites f
                    JOIN games g ON g.id = f.game_id
                    WHERE user_id = %s
                    """,
                    [user_id],
                )
                return [
                    FavoritesOut(
                        game_id=record[0],
                        title=record[1],
                        release_date=record[2],
                        esrb_rating=record[3],
                        user_id=record[4],
                    )
                    for record in db
                ]
