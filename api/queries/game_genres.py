from pydantic import BaseModel
from queries.pool import pool
from typing import List


class GameGenreIn(BaseModel):
    game_id: int
    genre_id: int


class GameGenreOut(BaseModel):
    game_id: int
    genre_id: int


class GenresForGamesOut(BaseModel):
    game_id: int
    title: str
    genre_id: int
    name: str


class GameGenreRepository:
    def create_game_genre(self, game_genres: GameGenreIn) -> GameGenreOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO game_genres
                        (game_id, genre_id)
                    VALUES
                        (%s, %s)
                    """,
                    [game_genres.game_id, game_genres.genre_id],
                )

                return GameGenreOut(
                    game_id=game_genres.game_id, genre_id=game_genres.genre_id
                )

    def get_all(self) -> List[GameGenreOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT game_id, genre_id
                    FROM game_genres
                    ORDER BY game_id
                    """
                )
                return [
                    GameGenreOut(game_id=record[0], genre_id=record[1])
                    for record in db
                ]

    def get_genres_for_game(self, game_id: int) -> List[GenresForGamesOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT gg.game_id, g.title, gg.genre_id, ge.title
                    FROM game_genres as gg
                    JOIN games g ON gg.game_id = g.id
                    JOIN genre ge on gg.genre_id = ge.id
                    WHERE gg.game_id = %s
                    """,
                    [game_id],
                )
                return [
                    GenresForGamesOut(
                        game_id=record[0],
                        title=record[1],
                        genre_id=record[2],
                        name=record[3],
                    )
                    for record in db.fetchall()
                ]

    def get_games_for_genre(self, genre_id: int) -> List[GenresForGamesOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT gg.game_id, g.title, gg.genre_id, ge.title
                    FROM game_genres as gg
                    JOIN games g ON gg.game_id = g.id
                    JOIN genre ge on gg.genre_id = ge.id
                    WHERE gg.genre_id = %s
                    """,
                    [genre_id],
                )
                return [
                    GenresForGamesOut(
                        game_id=record[0],
                        title=record[1],
                        genre_id=record[2],
                        name=record[3],
                    )
                    for record in db.fetchall()
                ]
