# CEO review

**Mode:** scope reduction (unattended contract chooses the smallest publishable vertical slice).

## Premise and alternatives
The original buyer and scope are wrong. “Residents' associations” are not a demonstrated scalable payer, and nationwide monitoring competes with better-funded data incumbents. The actual outcome is trusted continuity for one overworked local publisher. Alternatives were manual timelines (chosen), hybrid ingestion (deferred), and a national civic graph (rejected until retention).

## 11-part review
1. **Architecture:** Separate source proposal, human review, immutable event history, and delivery. Demo stays deterministic.
2. **Errors/rescue:** Name unknown issue, invalid URL/type/date, too-short summary, source fetch failure, duplicate evidence, stale edit, and digest failure. No silent publish.
3. **Security:** Treat submitted URLs/content as hostile; SSRF-safe fetch allowlists, sanitization, RBAC, rate limits, audit trails, and no secrets/client-side API keys.
4. **Data/interaction:** Cover nil/empty/wrong type/oversize/upstream error; disable duplicate submit in production; preserve drafts on navigation.
5. **Code quality:** Keep timeline ordering pure; centralize schemas; do not bury editorial policy in prompts.
6. **Tests:** API ordering/not-found/validation and browser filter/follow/form/mobile overflow cover the slice. Production needs auth, idempotency, revisions, and accessibility scans.
7. **Observability:** Queue age, source-fetch failure, broken links, corrections, digest delivery, and time-to-current-status need dashboards/alerts/runbooks.
8. **State:** Demo is browser-only. Production needs transactional revision writes, event dedupe, and outbox delivery.
9. **API:** Version schemas before embeds exist; use stable issue/event IDs, pagination, ETags, and rate limits.
10. **Scale:** Video transcription and editorial review—not read traffic—break first. Partition jobs by city and cap unreviewed backlog.
11. **UX:** Current status precedes chronology; every claim exposes provenance; unverified content is impossible to confuse with verified content; mobile hierarchy collapses cleanly.

## Decision
Ship the trust workflow, not fake automation. Accepted: inspect/filter/follow/add-evidence with review state, tested API, docs, and static deployment. Deferred: real ingestion, auth, email, persistence, embeds, payments, and multi-city operations. The strongest failure modes are false claims, no payer, and editorial labor exceeding $49 economics.
