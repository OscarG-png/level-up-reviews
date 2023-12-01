from pydantic import BaseModel
from queries.pool import pool
from typing import List
from datetime import date


class WishlistIn(BaseModel):
    game_id: int
    user_id: int


class WishlistCreateOut(BaseModel):
    game_id: int
    user_id: int


class WishlistOut(BaseModel):
    game_id: int
    title: str
    release_date: date
    esrb_rating: str
    user_id: int


class WishlistRepository:
    def create_wishlist(self, wishlist: WishlistIn) -> WishlistCreateOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO wishlist
                    VALUES (%s, %s)
                    """,
                    [wishlist.game_id, wishlist.user_id],
                )

                return WishlistCreateOut(
                    game_id=wishlist.game_id, user_id=wishlist.user_id
                )

    def get_wishlist_for_user(self, user_id: int) -> List[WishlistOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT w.game_id, g.title, g.release_date,
                    g.esrb_rating, w.user_id
                    FROM wishlist w
                    JOIN games g ON g.id = w.game_id
                    WHERE user_id = %s
                    """,
                    [user_id],
                )
                return [
                    WishlistOut(
                        game_id=record[0],
                        title=record[1],
                        release_date=record[2],
                        esrb_rating=record[3],
                        user_id=record[4],
                    )
                    for record in db
                ]
