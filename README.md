# Phytoseal

OpenAPI-first DDD monorepo for **Phytoseal** — port-network phytosanitary certificate ledger with AI HS/HTS classification assist for customs and AEO workflows.

Package scope: **`@phytoseal/*`**. Product specs: [PRODUCT.md](PRODUCT.md), [USER_STORIES.md](USER_STORIES.md), [WEBAPP.md](WEBAPP.md).

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp        →  console UI (Next.js)
```

## Quick start

```bash
# If .codegen is missing, copy it from zero-apps-codegen-scaffold (never commit it)
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: phytoseal_demo_local_dev_key
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=phytoseal-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. `.codegen/` is **local-only** — never commit or push (see `.cursor/rules/codegen-local-only.mdc`).
