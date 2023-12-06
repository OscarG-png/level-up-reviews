from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewRepository


client = TestClient(app)


class CreateReview:
    def create(self, review):
        result = {
            "id": 0,
        }
        result.update(review)
        return result


def test_create_review():
    app.dependency_overrides[ReviewRepository] = CreateReview
    expected = {
        "id": 0,
        "title": "string",
        "content": "string",
        "review_date": "2023-12-06",
        "rating": 0,
        "game_id": 0,
        "user_id": 0,
    }
    json = {
        "title": "string",
        "content": "string",
        "review_date": "2023-12-06",
        "rating": 0,
        "game_id": 0,
        "user_id": 0,
    }
    response = client.post("/reviews", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
