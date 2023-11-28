from pydantic import BaseModel
from typing import List
from queries.pool import pool
from datetime import date


class ReviewIn(BaseModel):
    title: str
    content: str
    review_date: date
    rating: int
    game_id: int
    user_id: int


class ReviewOut(BaseModel):
    id: int
    title: str
    content: str
    review_date: date
    rating: int
    game_id: int
    user_id: int


class GameRatingOut(BaseModel):
    title: str
    average_rating: float


class ReviewRepository:
    def create(self, reviews: ReviewIn) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO reviews
                        (title, content, review_date, rating, game_id, user_id)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        reviews.title,
                        reviews.content,
                        reviews.review_date,
                        reviews.rating,
                        reviews.game_id,
                        reviews.user_id,
                    ],
                )
                id = result.fetchone()[0]
                old_data = reviews.dict()
                return ReviewOut(id=id, **old_data)

    def get_all(self) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, title, content, review_date,
                      rating, game_id, user_id
                    FROM reviews
                    ORDER BY game_id
                    """
                )
                return [
                    ReviewOut(
                        id=record[0],
                        title=record[1],
                        content=record[2],
                        review_date=record[3],
                        rating=record[4],
                        game_id=record[5],
                        user_id=record[6],
                    )
                    for record in db
                ]

    def get_all_for_game(self, game_id: int) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM reviews
                    WHERE game_id = %s
                    """,
                    [game_id],
                )
                return [
                    ReviewOut(
                        id=record[0],
                        title=record[1],
                        content=record[2],
                        review_date=record[3],
                        rating=record[4],
                        game_id=record[5],
                        user_id=record[6],
                    )
                    for record in db
                ]

    def get_top_rated_games(self) -> List[GameRatingOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        g.title AS gametitle,
                        AVG(r.rating) AS averagerating
                    FROM games g
                    JOIN reviews r ON g.id = r.game_id
                    GROUP BY g.title
                    HAVING AVG(r.rating) >= 90
                    ORDER BY averagerating DESC
                    """
                )
                return [
                    GameRatingOut(
                        title=record[0], average_rating=float(record[1])
                    )
                    for record in db
                ]
