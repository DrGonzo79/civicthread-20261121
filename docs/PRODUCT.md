# Product plan

## ICP and JTBD
First ICP: solo civic newsletter writers and tiny local newsrooms already covering council meetings. When an issue resurfaces, help them answer what changed, when, why, and from which primary record without redoing years of research.

## MVP
One city, five issues, manually curated event timelines, explicit verification state, source links, watchlist, weekly change digest, and embeddable read view. The prototype ships timeline assembly, search/filter, following, contributor validation, and a human-review state. Fictional fixtures are shared by TypeScript and Python.

## Data model
`City → Issue → Event`; Event has date, kind, summary, primary-source URL/label, and verification state. `Watch` joins a reader/operator to an Issue. Production adds immutable revisions, editor identity, source snapshots, corrections, and delivery receipts.

## AI/model strategy
Phase one uses no generative model for public copy. Later, transcription and structured extraction propose events; a named human accepts, edits, or rejects each proposal. Store the source span and model/version. Never let generated inference become verified fact.

## Economics
Validate $49/month operator pricing first. At six issues per city, target under 90 minutes/week editorial labor and >70% gross margin before reader acquisition. $8 readers can supplement—not rescue—operator economics. $500+ agency service funds research but risks custom-work drift.

## Validation
Three civic writers, one real timeline each, unmoderated observation, then an explicit $49 checkout/letter of intent. Success in 14 days: two complete the workflow unaided, one pays, and each returns after a new meeting. Kill or pivot if nobody pays after 15 qualified conversations.

## Moat
No technical moat at launch. Potential moat is a correction-aware provenance graph, local editor reputation, durable embeds/backlinks, and years of issue history. Search/transcription is commodity.

## Risks
Defamation/privacy, incomplete or removed records, stale status, copied incumbent feature, local-news conversion proxy failure, publisher churn, and labor-heavy expansion. Public events require source provenance; disputed claims require correction history and an editor owner.

## Roadmap
- **0–30 days:** one city, six hand-built timelines, three operator trials, payment test.
- **31–60:** weekly digest, embed, revisions/corrections, ingestion proposals for one portal.
- **61–90:** only after retention, agency pilot and city-two playbook; instrument time-to-current-status, correction rate, return rate, and paid retention.
