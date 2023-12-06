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
    profile_picture: Optional[str]


class UserInUpdate(BaseModel):
    username: str
    email: str
    profile_picture: Optional[str]


class UserOutWithpassword(UserOut):
    password: str


class DuplicateUserError(ValueError):
    pass


class UserRepository:
    def record_to_userout(self, record) -> UserOutWithpassword:
        user_dict = {
            "id": record[0],
            "username": record[1],
            "email": record[2],
            "password": record[3],
            "profile_picture": record[4],
        }
        return user_dict

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
        except Exception as e:
            return {"message": e}

    def get(self, username: str) -> UserOutWithpassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        username,
                        email,
                        password,
                        profile_picture
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_userout(record)
        except Exception:
            return {"message": "Could not find account"}

    def create(
        self, users: UserIn, hashed_password: str
    ) -> UserOutWithpassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (username, email, password, profile_picture)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING
                    id,
                    username,
                    email,
                    password,
                    profile_picture
                    """,
                    [
                        users.username,
                        users.email,
                        hashed_password,
                        users.profile_picture,
                    ],
                )
                id = result.fetchone()[0]
                old_data = users.dict()
                new_user = UserOutWithpassword(id=id, **old_data)
                return new_user

    def update(
        self, user: UserInUpdate, user_id
    ) -> UserOutWithpassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE users
                    SET username=%s,
                    email=%s,
                    profile_picture=%s
                    WHERE id=%s
                    RETURNING
                    id,
                    username,
                    email,
                    profile_picture,
                    password
                    """,
                    [
                        user.username,
                        user.email,
                        user.profile_picture,
                        user_id,
                    ],
                )
                record = result.fetchone()
                if record:
                    updated_user = dict(zip([
                                            'id',
                                            'username',
                                            'email',
                                            'profile_picture',
                                            'password'
                                            ],
                                            record
                                            ))
                    return UserOutWithpassword(**updated_user)
