import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createLegalHold_Body = z
  .object({
    jurisdiction: z.string().min(1).max(200),
    rationale: z.string().min(1).max(4000),
    affectedCertificateIds: z
      .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(1),
  })
  .passthrough();
const LegalHoldStatus = z.enum(['active', 'released']);
const LegalHold = z
  .object({
    id: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
    jurisdiction: z.string().min(1).max(200),
    rationale: z.string().min(1).max(4000),
    status: z.enum(['active', 'released']),
    affectedCertificateIds: z
      .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(1),
    createdAt: z.string().datetime({ offset: true }),
    releasedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const LegalHoldCreateRequest = z
  .object({
    jurisdiction: z.string().min(1).max(200),
    rationale: z.string().min(1).max(4000),
    affectedCertificateIds: z
      .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(1),
  })
  .passthrough();
const LegalHoldReleaseRequest = z
  .object({ note: z.string().max(2000) })
  .partial()
  .passthrough();
const LegalHoldResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
        jurisdiction: z.string().min(1).max(200),
        rationale: z.string().min(1).max(4000),
        status: z.enum(['active', 'released']),
        affectedCertificateIds: z
          .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
          .min(1),
        createdAt: z.string().datetime({ offset: true }),
        releasedAt: z.string().datetime({ offset: true }).optional(),
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
const LegalHoldListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
          jurisdiction: z.string().min(1).max(200),
          rationale: z.string().min(1).max(4000),
          status: z.enum(['active', 'released']),
          affectedCertificateIds: z
            .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
            .min(1),
          createdAt: z.string().datetime({ offset: true }),
          releasedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const LegalHoldListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
              jurisdiction: z.string().min(1).max(200),
              rationale: z.string().min(1).max(4000),
              status: z.enum(['active', 'released']),
              affectedCertificateIds: z
                .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
                .min(1),
              createdAt: z.string().datetime({ offset: true }),
              releasedAt: z.string().datetime({ offset: true }).optional(),
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
const LegalHoldId = z.string();
const CertificateId = z.string();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createLegalHold_Body,
  LegalHoldStatus,
  LegalHold,
  LegalHoldCreateRequest,
  LegalHoldReleaseRequest,
  LegalHoldResponse,
  LegalHoldListData,
  LegalHoldListResponse,
  Problem,
  LegalHoldId,
  CertificateId,
  ResponseMeta,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/legal-holds',
    alias: 'listLegalHolds',
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
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'released']).optional(),
      },
      {
        name: 'jurisdiction',
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
                  id: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
                  jurisdiction: z.string().min(1).max(200),
                  rationale: z.string().min(1).max(4000),
                  status: z.enum(['active', 'released']),
                  affectedCertificateIds: z
                    .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .min(1),
                  createdAt: z.string().datetime({ offset: true }),
                  releasedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/legal-holds',
    alias: 'createLegalHold',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createLegalHold_Body,
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
            id: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            jurisdiction: z.string().min(1).max(200),
            rationale: z.string().min(1).max(4000),
            status: z.enum(['active', 'released']),
            affectedCertificateIds: z
              .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(1),
            createdAt: z.string().datetime({ offset: true }),
            releasedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/legal-holds/:holdId',
    alias: 'getLegalHold',
    requestFormat: 'json',
    parameters: [
      {
        name: 'holdId',
        type: 'Path',
        schema: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            jurisdiction: z.string().min(1).max(200),
            rationale: z.string().min(1).max(4000),
            status: z.enum(['active', 'released']),
            affectedCertificateIds: z
              .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(1),
            createdAt: z.string().datetime({ offset: true }),
            releasedAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'post',
    path: '/v1/legal-holds/:holdId/release',
    alias: 'releaseLegalHold',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ note: z.string().max(2000) })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'holdId',
        type: 'Path',
        schema: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            jurisdiction: z.string().min(1).max(200),
            rationale: z.string().min(1).max(4000),
            status: z.enum(['active', 'released']),
            affectedCertificateIds: z
              .array(z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(1),
            createdAt: z.string().datetime({ offset: true }),
            releasedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios('https://api.phytoseal.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
