from pydantic import BaseModel
from queries.pool import pool
from typing import List


class GenreIn(BaseModel):
    title: str
    description: str


class GenreOut(BaseModel):
    id: int
    title: str
    description: str


class GenreRepository:
    def create(self, genre: GenreIn) -> GenreOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO genre
                            (title, description)
                        VALUES
                            (%s, %s)
                        RETURNING id
                        """,
                        [genre.title, genre.description],
                    )
                    id = result.fetchone()[0]
                    old_data = genre.dict()
                    return GenreOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create genre"}

    def get_all(self) -> List[GenreOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, title, description
                        FROM genre
                        ORDER BY title
                        """
                    )
                    records = db.fetchall()
                    genres = [
                        GenreOut(
                            id=record[0],
                            title=record[1],
                            description=record[2],
                        )
                        for record in records
                    ]
                    return genres
        except Exception:
            return {"message": "Could not find genres"}
