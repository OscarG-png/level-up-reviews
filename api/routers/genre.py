from fastapi import APIRouter, Depends, HTTPException, status
from queries.genre import GenreIn, GenreOut, GenreRepository


router = APIRouter()


@router.post("/genre", response_model=GenreOut)
def create_genre(genre: GenreIn, repo: GenreRepository = Depends()):
    try:
        return repo.create(genre)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred"
        )


@router.get("/genre", response_model=dict)
def get_all(repo: GenreRepository = Depends()):
    try:
        genres = repo.get_all()
        return {
            "genres": genres
        }
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching genres."
        )
