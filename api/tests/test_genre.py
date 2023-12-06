from fastapi.testclient import TestClient
from main import app
from queries.genre import GenreRepository


client = TestClient(app)


class CreateGenre:
    def create(self, genre):
        result = {
            "id": 0,
        }
        result.update(genre)
        return result


def test_create_genre():
    app.dependency_overrides[GenreRepository] = CreateGenre
    expected = {
        "id": 0,
        "title": "string",
        "description": "string"
    }
    json = {
        "title": "string",
        "description": "string"
    }
    response = client.post('/genre', json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
