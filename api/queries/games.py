from pydantic import BaseModel
from queries.pool import pool
from datetime import date


class GameIn(BaseModel):
    title: str
    release_date: date
    esrb_rating: str


class GameOut(BaseModel):
    id: int
    title: str
    release_date: date
    esrb_rating: str


class GameRepository:
    def create(self, games: GameIn) -> GameOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO games
                        (title, release_date, esrb_rating)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id
                    """,
                    [games.title,
                     games.release_date,
                     games.esrb_rating

                     ]
                )
                id = result.fetchone()[0]
                old_data = games.dict()
                return GameOut(id=id, **old_data)
