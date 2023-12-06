from fastapi import (
    APIRouter,
    Depends,
    Response,
    Request,
)
from queries.users import (
    UserIn,
    UserOut,
    UserRepository,
    UserInUpdate,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import Optional


router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: Optional[str]


class AccountToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


@router.get("/api/protected", response_model=bool)
async def get_token_protected(
    request: Request,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
):
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/users", response_model=AccountToken)
async def create_user(
    users: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(users.password)
    user = repo.create(users, hashed_password)
    form = AccountForm(username=users.username, password=users.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(user=user, **token.dict())


@router.get("/users", response_model=dict)
def get_all_users(
    repo: UserRepository = Depends(),
):
    users = repo.get_all_users()
    return {
        "users": users
    }


@router.get("/user/{user_id}", response_model=UserOut)
def get_a_user(
    repo: UserRepository = Depends(),
):
    return repo.get()


@router.put("/users/{user_id}", response_model=UserOut)
async def update_user(
    user_id: int,
    user: UserInUpdate,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    user = repo.update(user, user_id)
    return user
