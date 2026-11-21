from __future__ import annotations
import json
from datetime import date
from pathlib import Path
from typing import Annotated, Literal
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, HttpUrl

DATA = json.loads((Path(__file__).parents[1] / "data" / "demo.json").read_text())
ISSUES = {issue["id"]: issue for issue in DATA["issues"]}
EVENTS = DATA["events"]
app = FastAPI(title="CivicThread API", version="0.1.0")

class Evidence(BaseModel):
    kind: Literal["meeting", "vote", "filing", "delay"]
    summary: Annotated[str, Field(min_length=12, max_length=500)]
    source_url: HttpUrl
    event_date: date

def timeline(issue_id: str, extra: dict | None = None) -> dict:
    issue = ISSUES.get(issue_id)
    if not issue:
        raise HTTPException(404, detail={"code":"ISSUE_NOT_FOUND","message":"This civic issue is not mapped."})
    events = [event for event in EVENTS if event["issue_id"] == issue_id]
    if extra: events.append(extra)
    events.sort(key=lambda event: event["date"], reverse=True)
    return {"issue":issue,"events":events,"event_count":len(events),"last_movement":events[0]["date"] if events else None}

@app.get("/health")
def health() -> dict: return {"status":"ok"}

@app.get("/issues")
def issues() -> dict: return {"city":DATA["city"],"issues":[timeline(issue_id) for issue_id in ISSUES]}

@app.get("/issues/{issue_id}")
def get_issue(issue_id: str) -> dict: return timeline(issue_id)

@app.post("/issues/{issue_id}/evidence", status_code=201)
def add_evidence(issue_id: str, evidence: Evidence) -> dict:
    extra={"id":"demo-submission","issue_id":issue_id,"date":evidence.event_date.isoformat(),"kind":evidence.kind,"summary":evidence.summary,"source_url":str(evidence.source_url),"source_label":"Contributor submission","verified":False}
    result=timeline(issue_id, extra)
    return {**result,"review_status":"pending_human_review","demo_only":True}
