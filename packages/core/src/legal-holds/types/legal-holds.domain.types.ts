/**
 * Legal Holds Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/legal-holds.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type LegalHold = components["schemas"]["LegalHold"];
export type LegalHoldListData = components["schemas"]["LegalHoldListData"];
export type LegalHoldStatus = components["schemas"]["LegalHoldStatus"];
export type LegalHoldCreateRequest = components["schemas"]["LegalHoldCreateRequest"];
export type LegalHoldReleaseRequest = components["schemas"]["LegalHoldReleaseRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateLegalHoldRequestInput = NonNullable<operations["createLegalHold"]["requestBody"]>["content"]["application/json"];
export type ReleaseLegalHoldRequestInput = NonNullable<operations["releaseLegalHold"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListLegalHoldsParams = NonNullable<operations["listLegalHolds"]["parameters"]["query"]>;
export type GetLegalHoldParams = operations["getLegalHold"]["parameters"]["path"];
export type ReleaseLegalHoldParams = operations["releaseLegalHold"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListLegalHoldsResponse = operations["listLegalHolds"]["responses"]["200"]["content"]["application/json"];
export type CreateLegalHoldResponse = operations["createLegalHold"]["responses"]["201"]["content"]["application/json"];
export type GetLegalHoldResponse = operations["getLegalHold"]["responses"]["200"]["content"]["application/json"];
export type ReleaseLegalHoldResponse = operations["releaseLegalHold"]["responses"]["200"]["content"]["application/json"];


