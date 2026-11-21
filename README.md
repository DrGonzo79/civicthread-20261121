# CivicThread

Runnable prototype for sourced, multi-year civic issue timelines. The frontend lets residents inspect, filter, follow, and contribute evidence to fictional local issues. The FastAPI backend performs timeline assembly, ordering, validation, and review-state assignment.

All city names, records, links, and activity in the demo are fictional. Following sends no email and submissions persist only in browser memory.

## Run and verify

Requires Node `26.13.1`, Python 3.12+, and `uv`.

```bash
npm ci && npm run dev
uv sync --directory api --frozen
uv run --directory api uvicorn main:app --reload

npm run typecheck
npm audit --audit-level=high
uv run --directory api pytest
uv run --directory api pip-audit
npm run test:e2e
npm run build
```

GitHub Pages hosts the static frontend only. The Python backend is runnable and tested source but is **not publicly deployed**.

See [product plan](docs/PRODUCT.md), [architecture](docs/ARCHITECTURE.md), [source notes](research/notes.md), and [opportunity score](docs/OPPORTUNITY_SCORE.md).
