/**
 * Classifications Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/classifications.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BrokerReview = components["schemas"]["BrokerReview"];
export type BrokerReviewOutcome = components["schemas"]["BrokerReviewOutcome"];
export type ClassificationProposal = components["schemas"]["ClassificationProposal"];
export type ClassificationProposalListData = components["schemas"]["ClassificationProposalListData"];
export type ClassificationProposalStatus = components["schemas"]["ClassificationProposalStatus"];
export type KnowledgeAnnotation = components["schemas"]["KnowledgeAnnotation"];
export type KnowledgeAnnotationListData = components["schemas"]["KnowledgeAnnotationListData"];
export type ClassificationProposalCreateRequest = components["schemas"]["ClassificationProposalCreateRequest"];
export type KnowledgeAnnotationCreateRequest = components["schemas"]["KnowledgeAnnotationCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateClassificationProposalRequestInput = NonNullable<operations["createClassificationProposal"]["requestBody"]>["content"]["application/json"];
export type ReviewClassificationProposalRequestInput = NonNullable<operations["reviewClassificationProposal"]["requestBody"]>["content"]["application/json"];
export type CreateKnowledgeAnnotationRequestInput = NonNullable<operations["createKnowledgeAnnotation"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListClassificationProposalsParams = NonNullable<operations["listClassificationProposals"]["parameters"]["query"]>;
export type GetClassificationProposalParams = operations["getClassificationProposal"]["parameters"]["path"];
export type ReviewClassificationProposalParams = operations["reviewClassificationProposal"]["parameters"]["path"];
export type ListKnowledgeAnnotationsParams = NonNullable<operations["listKnowledgeAnnotations"]["parameters"]["query"]>;
export type GetKnowledgeAnnotationParams = operations["getKnowledgeAnnotation"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListClassificationProposalsResponse = operations["listClassificationProposals"]["responses"]["200"]["content"]["application/json"];
export type CreateClassificationProposalResponse = operations["createClassificationProposal"]["responses"]["201"]["content"]["application/json"];
export type GetClassificationProposalResponse = operations["getClassificationProposal"]["responses"]["200"]["content"]["application/json"];
export type ReviewClassificationProposalResponse = operations["reviewClassificationProposal"]["responses"]["200"]["content"]["application/json"];
export type ListKnowledgeAnnotationsResponse = operations["listKnowledgeAnnotations"]["responses"]["200"]["content"]["application/json"];
export type CreateKnowledgeAnnotationResponse = operations["createKnowledgeAnnotation"]["responses"]["201"]["content"]["application/json"];
export type GetKnowledgeAnnotationResponse = operations["getKnowledgeAnnotation"]["responses"]["200"]["content"]["application/json"];


