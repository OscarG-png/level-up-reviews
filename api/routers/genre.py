from fastapi import APIRouter, Depends
from queries.genre import GenreIn, GenreOut, GenreRepository


router = APIRouter()


@router.post("/genre", response_model=GenreOut)
def create_genre(genre: GenreIn, repo: GenreRepository = Depends()):
    return repo.create(genre)


@router.get("/genre", response_model=dict)
def get_all(repo: GenreRepository = Depends()):
    genres = repo.get_all()
    return {
        "genres": genres
    }
