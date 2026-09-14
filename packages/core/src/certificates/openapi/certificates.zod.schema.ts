import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCertificate_Body = z
  .object({
    certificateType: z.enum(['phytosanitary', 'related_authorisation']),
    payloadHash: z.string().min(1),
    exportAuthorityId: z.string().min(1),
    importAuthorityId: z.string().min(1).optional(),
    shipmentRef: z.string().min(1),
    status: z
      .enum([
        'draft',
        'issued',
        'presented',
        'accepted',
        'rejected',
        'amended',
        'held',
      ])
      .optional(),
  })
  .passthrough();
const presentCertificate_Body = z
  .object({
    importAuthorityId: z.string().min(1),
    presentationNote: z.string().max(2000).optional(),
  })
  .passthrough();
const decideCertificate_Body = z
  .object({
    outcome: z.enum(['accepted', 'rejected']),
    reasonCode: z.string().max(100).optional(),
    detail: z.string().max(2000).optional(),
  })
  .passthrough();
const CertificateType = z.enum(['phytosanitary', 'related_authorisation']);
const CertificateStatus = z.enum([
  'draft',
  'issued',
  'presented',
  'accepted',
  'rejected',
  'amended',
  'held',
]);
const CertificateEventType = z.enum([
  'issued',
  'presented',
  'accepted',
  'rejected',
  'amended',
  'hold_placed',
  'hold_released',
]);
const CertificateDecisionOutcome = z.enum(['accepted', 'rejected']);
const Certificate = z
  .object({
    id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
    certificateType: z.enum(['phytosanitary', 'related_authorisation']),
    status: z.enum([
      'draft',
      'issued',
      'presented',
      'accepted',
      'rejected',
      'amended',
      'held',
    ]),
    payloadHash: z.string().min(1),
    exportAuthorityId: z.string().min(1),
    importAuthorityId: z.string().min(1).optional(),
    shipmentRef: z.string().min(1),
    legalHoldId: z
      .string()
      .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CertificateCreateRequest = z
  .object({
    certificateType: z.enum(['phytosanitary', 'related_authorisation']),
    payloadHash: z.string().min(1),
    exportAuthorityId: z.string().min(1),
    importAuthorityId: z.string().min(1).optional(),
    shipmentRef: z.string().min(1),
    status: z
      .enum([
        'draft',
        'issued',
        'presented',
        'accepted',
        'rejected',
        'amended',
        'held',
      ])
      .optional(),
  })
  .passthrough();
const CertificatePresentRequest = z
  .object({
    importAuthorityId: z.string().min(1),
    presentationNote: z.string().max(2000).optional(),
  })
  .passthrough();
const CertificateDecisionRequest = z
  .object({
    outcome: z.enum(['accepted', 'rejected']),
    reasonCode: z.string().max(100).optional(),
    detail: z.string().max(2000).optional(),
  })
  .passthrough();
const CertificateEvent = z
  .object({
    id: z.string().regex(/^cev_[0-9A-HJKMNP-TV-Z]{26}$/),
    certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
    eventType: z.enum([
      'issued',
      'presented',
      'accepted',
      'rejected',
      'amended',
      'hold_placed',
      'hold_released',
    ]),
    occurredAt: z.string().datetime({ offset: true }),
    actorId: z.string().min(1),
    detail: z.string().max(4000).optional(),
  })
  .passthrough();
const CertificateResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
        certificateType: z.enum(['phytosanitary', 'related_authorisation']),
        status: z.enum([
          'draft',
          'issued',
          'presented',
          'accepted',
          'rejected',
          'amended',
          'held',
        ]),
        payloadHash: z.string().min(1),
        exportAuthorityId: z.string().min(1),
        importAuthorityId: z.string().min(1).optional(),
        shipmentRef: z.string().min(1),
        legalHoldId: z
          .string()
          .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
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
const CertificateListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
          certificateType: z.enum(['phytosanitary', 'related_authorisation']),
          status: z.enum([
            'draft',
            'issued',
            'presented',
            'accepted',
            'rejected',
            'amended',
            'held',
          ]),
          payloadHash: z.string().min(1),
          exportAuthorityId: z.string().min(1),
          importAuthorityId: z.string().min(1).optional(),
          shipmentRef: z.string().min(1),
          legalHoldId: z
            .string()
            .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const CertificateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
              certificateType: z.enum([
                'phytosanitary',
                'related_authorisation',
              ]),
              status: z.enum([
                'draft',
                'issued',
                'presented',
                'accepted',
                'rejected',
                'amended',
                'held',
              ]),
              payloadHash: z.string().min(1),
              exportAuthorityId: z.string().min(1),
              importAuthorityId: z.string().min(1).optional(),
              shipmentRef: z.string().min(1),
              legalHoldId: z
                .string()
                .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
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
const CertificateEventListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cev_[0-9A-HJKMNP-TV-Z]{26}$/),
          certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
          eventType: z.enum([
            'issued',
            'presented',
            'accepted',
            'rejected',
            'amended',
            'hold_placed',
            'hold_released',
          ]),
          occurredAt: z.string().datetime({ offset: true }),
          actorId: z.string().min(1),
          detail: z.string().max(4000).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const CertificateEventListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cev_[0-9A-HJKMNP-TV-Z]{26}$/),
              certificateId: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
              eventType: z.enum([
                'issued',
                'presented',
                'accepted',
                'rejected',
                'amended',
                'hold_placed',
                'hold_released',
              ]),
              occurredAt: z.string().datetime({ offset: true }),
              actorId: z.string().min(1),
              detail: z.string().max(4000).optional(),
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
const CertificateId = z.string();
const LegalHoldId = z.string();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const CertificateEventId = z.string();

export const schemas: any = {
  createCertificate_Body,
  presentCertificate_Body,
  decideCertificate_Body,
  CertificateType,
  CertificateStatus,
  CertificateEventType,
  CertificateDecisionOutcome,
  Certificate,
  CertificateCreateRequest,
  CertificatePresentRequest,
  CertificateDecisionRequest,
  CertificateEvent,
  CertificateResponse,
  CertificateListData,
  CertificateListResponse,
  CertificateEventListData,
  CertificateEventListResponse,
  Problem,
  CertificateId,
  LegalHoldId,
  ResponseMeta,
  CertificateEventId,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/certificates',
    alias: 'listCertificates',
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
        schema: z
          .enum([
            'draft',
            'issued',
            'presented',
            'accepted',
            'rejected',
            'amended',
            'held',
          ])
          .optional(),
      },
      {
        name: 'certificateType',
        type: 'Query',
        schema: z.enum(['phytosanitary', 'related_authorisation']).optional(),
      },
      {
        name: 'shipmentRef',
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
                  id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  certificateType: z.enum([
                    'phytosanitary',
                    'related_authorisation',
                  ]),
                  status: z.enum([
                    'draft',
                    'issued',
                    'presented',
                    'accepted',
                    'rejected',
                    'amended',
                    'held',
                  ]),
                  payloadHash: z.string().min(1),
                  exportAuthorityId: z.string().min(1),
                  importAuthorityId: z.string().min(1).optional(),
                  shipmentRef: z.string().min(1),
                  legalHoldId: z
                    .string()
                    .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/certificates',
    alias: 'createCertificate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCertificate_Body,
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
            id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateType: z.enum(['phytosanitary', 'related_authorisation']),
            status: z.enum([
              'draft',
              'issued',
              'presented',
              'accepted',
              'rejected',
              'amended',
              'held',
            ]),
            payloadHash: z.string().min(1),
            exportAuthorityId: z.string().min(1),
            importAuthorityId: z.string().min(1).optional(),
            shipmentRef: z.string().min(1),
            legalHoldId: z
              .string()
              .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/certificates/:certificateId',
    alias: 'getCertificate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'certificateId',
        type: 'Path',
        schema: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateType: z.enum(['phytosanitary', 'related_authorisation']),
            status: z.enum([
              'draft',
              'issued',
              'presented',
              'accepted',
              'rejected',
              'amended',
              'held',
            ]),
            payloadHash: z.string().min(1),
            exportAuthorityId: z.string().min(1),
            importAuthorityId: z.string().min(1).optional(),
            shipmentRef: z.string().min(1),
            legalHoldId: z
              .string()
              .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/certificates/:certificateId/decision',
    alias: 'decideCertificate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideCertificate_Body,
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
            id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateType: z.enum(['phytosanitary', 'related_authorisation']),
            status: z.enum([
              'draft',
              'issued',
              'presented',
              'accepted',
              'rejected',
              'amended',
              'held',
            ]),
            payloadHash: z.string().min(1),
            exportAuthorityId: z.string().min(1),
            importAuthorityId: z.string().min(1).optional(),
            shipmentRef: z.string().min(1),
            legalHoldId: z
              .string()
              .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/certificates/:certificateId/events',
    alias: 'listCertificateEvents',
    requestFormat: 'json',
    parameters: [
      {
        name: 'certificateId',
        type: 'Path',
        schema: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^cev_[0-9A-HJKMNP-TV-Z]{26}$/),
                  certificateId: z
                    .string()
                    .regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  eventType: z.enum([
                    'issued',
                    'presented',
                    'accepted',
                    'rejected',
                    'amended',
                    'hold_placed',
                    'hold_released',
                  ]),
                  occurredAt: z.string().datetime({ offset: true }),
                  actorId: z.string().min(1),
                  detail: z.string().max(4000).optional(),
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
    path: '/v1/certificates/:certificateId/present',
    alias: 'presentCertificate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: presentCertificate_Body,
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
            id: z.string().regex(/^crt_[0-9A-HJKMNP-TV-Z]{26}$/),
            certificateType: z.enum(['phytosanitary', 'related_authorisation']),
            status: z.enum([
              'draft',
              'issued',
              'presented',
              'accepted',
              'rejected',
              'amended',
              'held',
            ]),
            payloadHash: z.string().min(1),
            exportAuthorityId: z.string().min(1),
            importAuthorityId: z.string().min(1).optional(),
            shipmentRef: z.string().min(1),
            legalHoldId: z
              .string()
              .regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
