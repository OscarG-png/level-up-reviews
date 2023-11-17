from pydantic import BaseModel
from typing import Optional, List
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
    def get_all_users(self) -> List[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, email, password, profile_picture
                        FROM users
                        ORDER BY username
                        """
                    )
                    result = []
                    for record in db:
                        users = UserOut(
                            id=record[0],
                            username=record[1],
                            email=record[2],
                            password=record[3],
                            profile_picture=record[4],
                        )
                        result.append(users)
                    return result
        except Exception:
            return {"message": "Could not get all users"}

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
                    [
                        users.username,
                        users.email,
                        users.password,
                        users.profile_picture,
                    ],
                )
                id = result.fetchone()[0]
                old_data = users.dict()
                return UserOut(id=id, **old_data)
