from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository

client = TestClient(app)


class EmptyUserRepository:
    def get_all_users(self):
        return []


def test_get_users():
    app.dependency_overrides[UserRepository] = EmptyUserRepository
    response = client.get("/users")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
