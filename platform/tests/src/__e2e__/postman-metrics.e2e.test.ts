/**
 * Postman-collection 1:1 Vitest tests for metrics (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  commodity: "",
  cursor: "",
  limit: "",
  period: "",
  reportId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / metrics (1:1 generated)", () => {

  it("getCycleTimeMetrics", async () => {
    const url = sub("{{baseUrl}}/v1/metrics/cycle-time?period={{period}}&commodity={{commodity}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("listCycleTimeReports", async () => {
    const url = sub("{{baseUrl}}/v1/metrics/reports?cursor={{cursor}}&limit={{limit}}&period={{period}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createCycleTimeReport", async () => {
    const url = sub("{{baseUrl}}/v1/metrics/reports");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"period\": \"\",\n  \"commodity\": \"\",\n  \"metrics\": null\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['cycleTimeReportId'] = j.data.id;
  });

  it("getCycleTimeReport", async () => {
    const url = sub("{{baseUrl}}/v1/metrics/reports/{{reportId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
