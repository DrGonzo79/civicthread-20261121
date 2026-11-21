from fastapi.testclient import TestClient
from main import app
client=TestClient(app)

def test_returns_ordered_issue_timeline():
    response=client.get("/issues/oak-speed")
    assert response.status_code==200
    body=response.json()
    assert body["event_count"]==4
    assert body["events"][0]["date"]=="2026-10-28"

def test_accepts_evidence_as_unverified_demo():
    response=client.post("/issues/oak-speed/evidence",json={"kind":"vote","summary":"Council continued the item to December.","source_url":"https://example.com/minutes","event_date":"2026-11-21"})
    assert response.status_code==201
    assert response.json()["review_status"]=="pending_human_review"
    assert response.json()["events"][0]["verified"] is False

def test_named_not_found_and_validation_failures():
    missing=client.get("/issues/not-real")
    assert missing.status_code==404
    assert missing.json()["detail"]["code"]=="ISSUE_NOT_FOUND"
    invalid=client.post("/issues/oak-speed/evidence",json={"kind":"rumor","summary":"short","source_url":"not-a-url","event_date":"tomorrow"})
    assert invalid.status_code==422
