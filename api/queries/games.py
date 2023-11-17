from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from typing import List


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
                    [games.title, games.release_date, games.esrb_rating],
                )
                id = result.fetchone()[0]
                old_data = games.dict()
                return GameOut(id=id, **old_data)

    def get_all(self) -> List[GameOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, title, release_date, esrb_rating
                    FROM games
                    ORDER BY title
                    """
                )
                return [
                    GameOut(
                        id=record[0],
                        title=record[1],
                        release_date=record[2],
                        esrb_rating=record[3],
                    )
                    for record in db
                ]
