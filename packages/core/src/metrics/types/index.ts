/**
 * Metrics Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/metrics.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CycleTimeMetrics = components["schemas"]["CycleTimeMetrics"];
export type CycleTimeReport = components["schemas"]["CycleTimeReport"];
export type CycleTimeReportListData = components["schemas"]["CycleTimeReportListData"];
export type CycleTimeReportCreateRequest = components["schemas"]["CycleTimeReportCreateRequest"];
export type Report = operations["listCycleTimeReports"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCycleTimeReportRequestInput = NonNullable<operations["createCycleTimeReport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetCycleTimeMetricsParams = NonNullable<operations["getCycleTimeMetrics"]["parameters"]["query"]>;
export type ListCycleTimeReportsParams = NonNullable<operations["listCycleTimeReports"]["parameters"]["query"]>;
export type GetCycleTimeReportParams = operations["getCycleTimeReport"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetCycleTimeMetricsResponse = operations["getCycleTimeMetrics"]["responses"]["200"]["content"]["application/json"];
export type ListCycleTimeReportsResponse = operations["listCycleTimeReports"]["responses"]["200"]["content"]["application/json"];
export type CreateCycleTimeReportResponse = operations["createCycleTimeReport"]["responses"]["201"]["content"]["application/json"];
export type GetCycleTimeReportResponse = operations["getCycleTimeReport"]["responses"]["200"]["content"]["application/json"];


