from fastapi import APIRouter, Depends
from queries.users import UserIn, UserOut, UserRepository
from typing import List

router = APIRouter()


@router.post("/users", response_model=UserOut)
def create_user(
    users: UserIn,
    repo: UserRepository = Depends()
):
    return repo.create(users)

@router.get("/users", response_model=List[UserOut])
def get_all_users(
    repo: UserRepository = Depends(),
):
    return repo.get_all_users()
