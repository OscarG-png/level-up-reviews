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
    def game_in_to_out(self, id: int, games: GameIn):
        old_data = games.dict()
        return GameOut(id=id, **old_data)

    def record_to_gameout(self, record) -> GameOut:
        game_dict = {
            "id": record[0],
            "title": record[1],
            "release_date": record[2],
            "esrb_rating": record[3],
        }
        return game_dict

    def delete(self, game_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM games
                    WHERE id = %s
                    """,
                    [game_id]
                )
                return True

    def update(self, game_id: int, games: GameIn) -> GameOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE games
                    SET title = %s
                     , release_date = %s
                     , esrb_rating = %s
                    WHERE id = %s
                    """,
                    [
                        games.title,
                        games.release_date,
                        games.esrb_rating,
                        game_id
                    ]
                )
                return self.game_in_to_out(game_id, games)

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
                return self.game_in_to_out(id, games)

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

    def get_one_game(self, game_id: int) -> GameOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, release_date, esrb_rating
                        FROM games
                        WHERE id = %s
                        """,
                        [game_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_gameout(record)
        except Exception:
            return {"message": "Could not find account"}
