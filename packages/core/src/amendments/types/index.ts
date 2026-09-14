/**
 * Amendments Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/amendments.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Amendment = components["schemas"]["Amendment"];
export type AmendmentListData = components["schemas"]["AmendmentListData"];
export type AmendmentStatus = components["schemas"]["AmendmentStatus"];
export type AmendmentCreateRequest = components["schemas"]["AmendmentCreateRequest"];
export type AmendmentDecisionRequest = components["schemas"]["AmendmentDecisionRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCertificateAmendmentRequestInput = NonNullable<operations["createCertificateAmendment"]["requestBody"]>["content"]["application/json"];
export type ApproveAmendmentRequestInput = NonNullable<operations["approveAmendment"]["requestBody"]>["content"]["application/json"];
export type RejectAmendmentRequestInput = NonNullable<operations["rejectAmendment"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAmendmentsParams = NonNullable<operations["listAmendments"]["parameters"]["query"]>;
export type CreateCertificateAmendmentParams = operations["createCertificateAmendment"]["parameters"]["path"];
export type GetAmendmentParams = operations["getAmendment"]["parameters"]["path"];
export type ApproveAmendmentParams = operations["approveAmendment"]["parameters"]["path"];
export type RejectAmendmentParams = operations["rejectAmendment"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAmendmentsResponse = operations["listAmendments"]["responses"]["200"]["content"]["application/json"];
export type CreateCertificateAmendmentResponse = operations["createCertificateAmendment"]["responses"]["201"]["content"]["application/json"];
export type GetAmendmentResponse = operations["getAmendment"]["responses"]["200"]["content"]["application/json"];
export type ApproveAmendmentResponse = operations["approveAmendment"]["responses"]["200"]["content"]["application/json"];
export type RejectAmendmentResponse = operations["rejectAmendment"]["responses"]["200"]["content"]["application/json"];


