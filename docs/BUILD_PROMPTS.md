# Phased build prompts

1. **Persistence and corrections:** Add Postgres issues/events/revisions, editor RBAC, idempotent evidence submission, correction history, audit log, and integration tests. Preserve the current public API contract.
2. **One-portal ingestion:** Ingest agendas/minutes from one named city's public portal into proposed events with exact source spans. Block publication until a human accepts. Test changed HTML, missing documents, duplicate agendas, timeouts, and malicious URLs.
3. **Operator delivery:** Add weekly email digests and embeddable timelines via an outbox. Instrument delivery receipts, broken embeds, timeline return rate, editor minutes, and paid retention.
