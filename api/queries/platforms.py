from pydantic import BaseModel
from typing import List
from queries.pool import pool


class PlatformIn(BaseModel):
    name: str


class PlatformOut(BaseModel):
    id: int
    name: str


class PlatformsRepository:
    def create(self, platforms: PlatformIn) -> PlatformOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO platforms
                        (name)
                    VALUES
                        (%s)
                    RETURNING id
                    """,
                    [platforms.name],
                )
                id = result.fetchone()[0]
                old_data = platforms.dict()
                return PlatformOut(id=id, **old_data)

    def get_all(self) -> List[PlatformOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, name
                    FROM platforms
                    ORDER BY name
                    """
                )
                return [
                    PlatformOut(id=record[0], name=record[1]) for record in db
                ]
