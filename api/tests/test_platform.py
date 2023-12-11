from fastapi.testclient import TestClient
from main import app
from queries.platforms import PlatformsRepository


client = TestClient(app)


class CreatePlatform:
    def create(self, platform):
        result = {
            "id": 0,
        }
        result.update(platform)
        return result


def test_create_platform():
    app.dependency_overrides[PlatformsRepository] = CreatePlatform
    expected = {
        "id": 0,
        "name": "string",
    }
    json = {
        "name": "string",
    }
    response = client.post('/platforms', json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
