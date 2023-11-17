from fastapi import APIRouter, Depends
from queries.genre import GenreIn, GenreOut, GenreRepository


router = APIRouter()


@router.post("/genre", response_model=GenreOut)
def create_genre(
    genre: GenreIn,
    repo: GenreRepository = Depends()
):
    return repo.create(genre)
