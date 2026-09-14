import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCycleTimeReport_Body = z
  .object({
    period: z.string().min(1),
    commodity: z.string().optional(),
    metrics: z
      .object({
        period: z.string().min(1),
        medianIssueToAcceptHours: z.number().gte(0),
        interactionProxyCount: z.number().int().gte(0),
        paperworkCostSharePct: z.number().gte(0).lte(100),
        partiesOnboarded: z.number().int().gte(0),
        baselineInteractionCount: z.number().int().gte(0).default(200),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
const CycleTimeMetrics = z
  .object({
    period: z.string().min(1),
    medianIssueToAcceptHours: z.number().gte(0),
    interactionProxyCount: z.number().int().gte(0),
    paperworkCostSharePct: z.number().gte(0).lte(100),
    partiesOnboarded: z.number().int().gte(0),
    baselineInteractionCount: z.number().int().gte(0).default(200),
  })
  .passthrough();
const CycleTimeMetricsResponse = z
  .object({
    data: z
      .object({
        period: z.string().min(1),
        medianIssueToAcceptHours: z.number().gte(0),
        interactionProxyCount: z.number().int().gte(0),
        paperworkCostSharePct: z.number().gte(0).lte(100),
        partiesOnboarded: z.number().int().gte(0),
        baselineInteractionCount: z.number().int().gte(0).default(200),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const CycleTimeReport = z
  .object({
    id: z.string().regex(/^mtr_[0-9A-HJKMNP-TV-Z]{26}$/),
    period: z.string().min(1),
    metrics: z
      .object({
        period: z.string().min(1),
        medianIssueToAcceptHours: z.number().gte(0),
        interactionProxyCount: z.number().int().gte(0),
        paperworkCostSharePct: z.number().gte(0).lte(100),
        partiesOnboarded: z.number().int().gte(0),
        baselineInteractionCount: z.number().int().gte(0).default(200),
      })
      .passthrough(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CycleTimeReportCreateRequest = z
  .object({
    period: z.string().min(1),
    commodity: z.string().optional(),
    metrics: z
      .object({
        period: z.string().min(1),
        medianIssueToAcceptHours: z.number().gte(0),
        interactionProxyCount: z.number().int().gte(0),
        paperworkCostSharePct: z.number().gte(0).lte(100),
        partiesOnboarded: z.number().int().gte(0),
        baselineInteractionCount: z.number().int().gte(0).default(200),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
const CycleTimeReportResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^mtr_[0-9A-HJKMNP-TV-Z]{26}$/),
        period: z.string().min(1),
        metrics: z
          .object({
            period: z.string().min(1),
            medianIssueToAcceptHours: z.number().gte(0),
            interactionProxyCount: z.number().int().gte(0),
            paperworkCostSharePct: z.number().gte(0).lte(100),
            partiesOnboarded: z.number().int().gte(0),
            baselineInteractionCount: z.number().int().gte(0).default(200),
          })
          .passthrough(),
        createdAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const CycleTimeReportListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^mtr_[0-9A-HJKMNP-TV-Z]{26}$/),
          period: z.string().min(1),
          metrics: z
            .object({
              period: z.string().min(1),
              medianIssueToAcceptHours: z.number().gte(0),
              interactionProxyCount: z.number().int().gte(0),
              paperworkCostSharePct: z.number().gte(0).lte(100),
              partiesOnboarded: z.number().int().gte(0),
              baselineInteractionCount: z.number().int().gte(0).default(200),
            })
            .passthrough(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const CycleTimeReportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^mtr_[0-9A-HJKMNP-TV-Z]{26}$/),
              period: z.string().min(1),
              metrics: z
                .object({
                  period: z.string().min(1),
                  medianIssueToAcceptHours: z.number().gte(0),
                  interactionProxyCount: z.number().int().gte(0),
                  paperworkCostSharePct: z.number().gte(0).lte(100),
                  partiesOnboarded: z.number().int().gte(0),
                  baselineInteractionCount: z
                    .number()
                    .int()
                    .gte(0)
                    .default(200),
                })
                .passthrough(),
              createdAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const MetricsReportId = z.string();

export const schemas: any = {
  createCycleTimeReport_Body,
  CycleTimeMetrics,
  CycleTimeMetricsResponse,
  CycleTimeReport,
  CycleTimeReportCreateRequest,
  CycleTimeReportResponse,
  CycleTimeReportListData,
  CycleTimeReportListResponse,
  Problem,
  ResponseMeta,
  MetricsReportId,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/metrics/cycle-time',
    alias: 'getCycleTimeMetrics',
    requestFormat: 'json',
    parameters: [
      {
        name: 'period',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'commodity',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            period: z.string().min(1),
            medianIssueToAcceptHours: z.number().gte(0),
            interactionProxyCount: z.number().int().gte(0),
            paperworkCostSharePct: z.number().gte(0).lte(100),
            partiesOnboarded: z.number().int().gte(0),
            baselineInteractionCount: z.number().int().gte(0).default(200),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/metrics/reports',
    alias: 'listCycleTimeReports',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().min(1).max(512).optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^mtr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  period: z.string().min(1),
                  metrics: z
                    .object({
                      period: z.string().min(1),
                      medianIssueToAcceptHours: z.number().gte(0),
                      interactionProxyCount: z.number().int().gte(0),
                      paperworkCostSharePct: z.number().gte(0).lte(100),
                      partiesOnboarded: z.number().int().gte(0),
                      baselineInteractionCount: z
                        .number()
                        .int()
                        .gte(0)
                        .default(200),
                    })
                    .passthrough(),
                  createdAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/metrics/reports',
    alias: 'createCycleTimeReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCycleTimeReport_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^mtr_[0-9A-HJKMNP-TV-Z]{26}$/),
            period: z.string().min(1),
            metrics: z
              .object({
                period: z.string().min(1),
                medianIssueToAcceptHours: z.number().gte(0),
                interactionProxyCount: z.number().int().gte(0),
                paperworkCostSharePct: z.number().gte(0).lte(100),
                partiesOnboarded: z.number().int().gte(0),
                baselineInteractionCount: z.number().int().gte(0).default(200),
              })
              .passthrough(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/metrics/reports/:reportId',
    alias: 'getCycleTimeReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reportId',
        type: 'Path',
        schema: z.string().regex(/^mtr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^mtr_[0-9A-HJKMNP-TV-Z]{26}$/),
            period: z.string().min(1),
            metrics: z
              .object({
                period: z.string().min(1),
                medianIssueToAcceptHours: z.number().gte(0),
                interactionProxyCount: z.number().int().gte(0),
                paperworkCostSharePct: z.number().gte(0).lte(100),
                partiesOnboarded: z.number().int().gte(0),
                baselineInteractionCount: z.number().int().gte(0).default(200),
              })
              .passthrough(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios('https://api.phytoseal.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
