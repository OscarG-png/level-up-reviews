from fastapi.testclient import TestClient
from main import app
from queries.games import GameRepository


client = TestClient(app)


class CreateGame:
    def create(self, game):
        result = {
            "id": 0,
        }
        result.update(game)
        return result


def test_create_game():
    app.dependency_overrides[GameRepository] = CreateGame
    expected = {
        "id": 0,
        "title": "string",
        "release_date": "2023-11-30",
        "esrb_rating": "string"
    }
    json = {
        "title": "string",
        "release_date": "2023-11-30",
        "esrb_rating": "string"
    }
    response = client.post('/games', json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
