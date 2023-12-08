from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.reviews import ReviewRepository
from queries.users import UserOut


client = TestClient(app)


class CreateReview:
    def create(self, review):
        result = {
            "id": 0,
        }
        result.update(review)
        return result


class AuthTest:
    def get_current_account_data(self, user):
        return {
            "id": 0,
            "username": "string",
            "email": "string",
            "profile_picture": "string"
        }


def fake_get_current_account_data():
    return UserOut(
            id=0,
            username="string",
            email="string",
            profile_picture="string"
        )


def fake_get_engine():
    return None


def test_create_review():
    app.dependency_overrides[ReviewRepository] = CreateReview
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

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
