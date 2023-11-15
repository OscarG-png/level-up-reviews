from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class UserIn(BaseModel):
    username: str
    email: str
    password: str
    profile_picture: Optional[str]


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    password: str
    profile_picture: Optional[str]


class UserRepository:
    def create(self, users: UserIn) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (username, email, password, profile_picture)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id
                    """,
                    [users.username,
                     users.email,
                     users.password,
                     users.profile_picture
                     ]
                )
                id = result.fetchone()[0]
                old_data = users.dict()
                return UserOut(id=id, **old_data)
