/**
 * Certificates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/certificates.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Certificate = components["schemas"]["Certificate"];
export type CertificateDecisionOutcome = components["schemas"]["CertificateDecisionOutcome"];
export type CertificateEvent = components["schemas"]["CertificateEvent"];
export type CertificateEventListData = components["schemas"]["CertificateEventListData"];
export type CertificateEventType = components["schemas"]["CertificateEventType"];
export type CertificateListData = components["schemas"]["CertificateListData"];
export type CertificateStatus = components["schemas"]["CertificateStatus"];
export type CertificateType = components["schemas"]["CertificateType"];
export type CertificateCreateRequest = components["schemas"]["CertificateCreateRequest"];
export type CertificateDecisionRequest = components["schemas"]["CertificateDecisionRequest"];
export type CertificatePresentRequest = components["schemas"]["CertificatePresentRequest"];
export type Event = operations["listCertificateEvents"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCertificateRequestInput = NonNullable<operations["createCertificate"]["requestBody"]>["content"]["application/json"];
export type PresentCertificateRequestInput = NonNullable<operations["presentCertificate"]["requestBody"]>["content"]["application/json"];
export type DecideCertificateRequestInput = NonNullable<operations["decideCertificate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCertificatesParams = NonNullable<operations["listCertificates"]["parameters"]["query"]>;
export type GetCertificateParams = operations["getCertificate"]["parameters"]["path"];
export type PresentCertificateParams = operations["presentCertificate"]["parameters"]["path"];
export type DecideCertificateParams = operations["decideCertificate"]["parameters"]["path"];
export type ListCertificateEventsParams = NonNullable<operations["listCertificateEvents"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCertificatesResponse = operations["listCertificates"]["responses"]["200"]["content"]["application/json"];
export type CreateCertificateResponse = operations["createCertificate"]["responses"]["201"]["content"]["application/json"];
export type GetCertificateResponse = operations["getCertificate"]["responses"]["200"]["content"]["application/json"];
export type PresentCertificateResponse = operations["presentCertificate"]["responses"]["202"]["content"]["application/json"];
export type DecideCertificateResponse = operations["decideCertificate"]["responses"]["200"]["content"]["application/json"];
export type ListCertificateEventsResponse = operations["listCertificateEvents"]["responses"]["200"]["content"]["application/json"];


