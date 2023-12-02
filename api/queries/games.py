from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from typing import List


class GameIn(BaseModel):
    title: str
    game_picture: str
    release_date: date
    esrb_rating: str


class GameOut(BaseModel):
    id: int
    title: str
    game_picture: str
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
            "game_picture": record[2],
            "release_date": record[3],
            "esrb_rating": record[4],
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
                    [game_id],
                )
                return True

    def update(self, game_id: int, games: GameIn) -> GameOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE games
                    SET title = %s
                     , game_picture = %s
                     , release_date = %s
                     , esrb_rating = %s
                    WHERE id = %s
                    """,
                    [
                        games.title,
                        games.game_picture,
                        games.release_date,
                        games.esrb_rating,
                        game_id,
                    ],
                )
                return self.game_in_to_out(game_id, games)

    def create(self, games: GameIn) -> GameOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO games
                        (title, game_picture, release_date, esrb_rating)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id
                    """,
                    [games.title,
                     games.game_picture,
                     games.release_date,
                     games.esrb_rating
                     ],
                )
                id = result.fetchone()[0]
                return self.game_in_to_out(id, games)

    def get_all(self) -> List[GameOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, title, game_picture, release_date, esrb_rating
                    FROM games
                    ORDER BY title
                    """
                )
                games = []
                rows = db.fetchall()
                for row in rows:
                    game = self.record_to_gameout(row)
                    games.append(game)
                print("games from get all:", games)
                return games

    def get_one_game(self, game_id: int) -> GameOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , title
                        , game_picture
                        , release_date
                        , esrb_rating
                        FROM games
                        WHERE id = %s
                        """,
                        [game_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_gameout(record)
        except Exception:
            return {"message": "Could not find game"}
