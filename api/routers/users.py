from fastapi import APIRouter, Depends
from queries.users import UserIn, UserRepository


router = APIRouter()


@router.post("/users")
def create_user(
    users: UserIn,
    repo: UserRepository = Depends()
):
    return repo.create(users)
