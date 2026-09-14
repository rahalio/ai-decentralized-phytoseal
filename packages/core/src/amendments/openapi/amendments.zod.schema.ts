import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCertificateAmendment_Body = z
  .object({
    rationale: z.string().min(1).max(4000),
    newPayloadHash: z.string().min(1),
  })
  .passthrough();
const AmendmentStatus = z.enum(['proposed', 'approved', 'rejected']);
const Amendment = z
  .object({
    id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
    certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
    rationale: z.string().min(1).max(4000),
    newPayloadHash: z.string().min(1),
    status: z.enum(['proposed', 'approved', 'rejected']),
    priorPayloadHash: z.string().min(1),
    createdAt: z.string().datetime({ offset: true }),
    decidedAt: z.string().datetime({ offset: true }).optional(),
    decidedBy: z.string().min(1).optional(),
  })
  .passthrough();
const AmendmentCreateRequest = z
  .object({
    rationale: z.string().min(1).max(4000),
    newPayloadHash: z.string().min(1),
  })
  .passthrough();
const AmendmentDecisionRequest = z
  .object({ note: z.string().max(2000) })
  .partial()
  .passthrough();
const AmendmentResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
        certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
        rationale: z.string().min(1).max(4000),
        newPayloadHash: z.string().min(1),
        status: z.enum(['proposed', 'approved', 'rejected']),
        priorPayloadHash: z.string().min(1),
        createdAt: z.string().datetime({ offset: true }),
        decidedAt: z.string().datetime({ offset: true }).optional(),
        decidedBy: z.string().min(1).optional(),
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
const AmendmentListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
          certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
          rationale: z.string().min(1).max(4000),
          newPayloadHash: z.string().min(1),
          status: z.enum(['proposed', 'approved', 'rejected']),
          priorPayloadHash: z.string().min(1),
          createdAt: z.string().datetime({ offset: true }),
          decidedAt: z.string().datetime({ offset: true }).optional(),
          decidedBy: z.string().min(1).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const AmendmentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
              certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
              rationale: z.string().min(1).max(4000),
              newPayloadHash: z.string().min(1),
              status: z.enum(['proposed', 'approved', 'rejected']),
              priorPayloadHash: z.string().min(1),
              createdAt: z.string().datetime({ offset: true }),
              decidedAt: z.string().datetime({ offset: true }).optional(),
              decidedBy: z.string().min(1).optional(),
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
const CertificateId = z.string();
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
const AmendmentId = z.string();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createCertificateAmendment_Body,
  AmendmentStatus,
  Amendment,
  AmendmentCreateRequest,
  AmendmentDecisionRequest,
  AmendmentResponse,
  AmendmentListData,
  AmendmentListResponse,
  CertificateId,
  Problem,
  AmendmentId,
  ResponseMeta,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/amendments',
    alias: 'listAmendments',
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
        name: 'certificateId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['proposed', 'approved', 'rejected']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  certificateId: z
                    .string()
                    .regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  rationale: z.string().min(1).max(4000),
                  newPayloadHash: z.string().min(1),
                  status: z.enum(['proposed', 'approved', 'rejected']),
                  priorPayloadHash: z.string().min(1),
                  createdAt: z.string().datetime({ offset: true }),
                  decidedAt: z.string().datetime({ offset: true }).optional(),
                  decidedBy: z.string().min(1).optional(),
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
    method: 'get',
    path: '/v1/amendments/:amendmentId',
    alias: 'getAmendment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'amendmentId',
        type: 'Path',
        schema: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            rationale: z.string().min(1).max(4000),
            newPayloadHash: z.string().min(1),
            status: z.enum(['proposed', 'approved', 'rejected']),
            priorPayloadHash: z.string().min(1),
            createdAt: z.string().datetime({ offset: true }),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            decidedBy: z.string().min(1).optional(),
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
    path: '/v1/amendments/:amendmentId/approve',
    alias: 'approveAmendment',
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
        name: 'amendmentId',
        type: 'Path',
        schema: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            rationale: z.string().min(1).max(4000),
            newPayloadHash: z.string().min(1),
            status: z.enum(['proposed', 'approved', 'rejected']),
            priorPayloadHash: z.string().min(1),
            createdAt: z.string().datetime({ offset: true }),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            decidedBy: z.string().min(1).optional(),
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
  {
    method: 'post',
    path: '/v1/amendments/:amendmentId/reject',
    alias: 'rejectAmendment',
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
        name: 'amendmentId',
        type: 'Path',
        schema: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            rationale: z.string().min(1).max(4000),
            newPayloadHash: z.string().min(1),
            status: z.enum(['proposed', 'approved', 'rejected']),
            priorPayloadHash: z.string().min(1),
            createdAt: z.string().datetime({ offset: true }),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            decidedBy: z.string().min(1).optional(),
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
  {
    method: 'post',
    path: '/v1/certificates/:certificateId/amendments',
    alias: 'createCertificateAmendment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCertificateAmendment_Body,
      },
      {
        name: 'certificateId',
        type: 'Path',
        schema: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^amd_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            rationale: z.string().min(1).max(4000),
            newPayloadHash: z.string().min(1),
            status: z.enum(['proposed', 'approved', 'rejected']),
            priorPayloadHash: z.string().min(1),
            createdAt: z.string().datetime({ offset: true }),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            decidedBy: z.string().min(1).optional(),
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
