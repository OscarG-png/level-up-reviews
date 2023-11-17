from fastapi import APIRouter, Depends
from queries.genre import GenreIn, GenreOut, GenreRepository
from typing import List


router = APIRouter()


@router.post("/genre", response_model=GenreOut)
def create_genre(
    genre: GenreIn,
    repo: GenreRepository = Depends()
):
    return repo.create(genre)


@router.get("/genre", response_model=List[GenreOut])
def get_all(
    repo: GenreRepository = Depends()
):
    return repo.get_all()
