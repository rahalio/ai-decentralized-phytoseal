/**
 * Port Parties Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/port-parties.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DisclosurePolicy = components["schemas"]["DisclosurePolicy"];
export type DisclosurePolicyListData = components["schemas"]["DisclosurePolicyListData"];
export type DisclosurePolicySimulateResult = components["schemas"]["DisclosurePolicySimulateResult"];
export type DisclosurePolicyStatus = components["schemas"]["DisclosurePolicyStatus"];
export type DisclosureRule = components["schemas"]["DisclosureRule"];
export type IntegrationStatus = components["schemas"]["IntegrationStatus"];
export type PartyType = components["schemas"]["PartyType"];
export type PortParty = components["schemas"]["PortParty"];
export type PortPartyListData = components["schemas"]["PortPartyListData"];
export type DisclosurePolicyCreateRequest = components["schemas"]["DisclosurePolicyCreateRequest"];
export type DisclosurePolicyReplaceRequest = components["schemas"]["DisclosurePolicyReplaceRequest"];
export type DisclosurePolicySimulateRequest = components["schemas"]["DisclosurePolicySimulateRequest"];
export type PortPartyCreateRequest = components["schemas"]["PortPartyCreateRequest"];
export type PortPartyInviteRequest = components["schemas"]["PortPartyInviteRequest"];
export type PortPartyUpdateRequest = components["schemas"]["PortPartyUpdateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePortPartyRequestInput = NonNullable<operations["createPortParty"]["requestBody"]>["content"]["application/json"];
export type UpdatePortPartyRequestInput = NonNullable<operations["updatePortParty"]["requestBody"]>["content"]["application/json"];
export type UpdatePortPartyRequest = UpdatePortPartyRequestInput;
export type InvitePortPartyRequestInput = NonNullable<operations["invitePortParty"]["requestBody"]>["content"]["application/json"];
export type CreateDisclosurePolicyRequestInput = NonNullable<operations["createDisclosurePolicy"]["requestBody"]>["content"]["application/json"];
export type ReplaceDisclosurePolicyRequestInput = NonNullable<operations["replaceDisclosurePolicy"]["requestBody"]>["content"]["application/json"];
export type SimulateDisclosurePolicyRequestInput = NonNullable<operations["simulateDisclosurePolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPortPartiesParams = NonNullable<operations["listPortParties"]["parameters"]["query"]>;
export type GetPortPartyParams = operations["getPortParty"]["parameters"]["path"];
export type UpdatePortPartyParams = operations["updatePortParty"]["parameters"]["path"];
export type InvitePortPartyParams = operations["invitePortParty"]["parameters"]["path"];
export type ListDisclosurePoliciesParams = NonNullable<operations["listDisclosurePolicies"]["parameters"]["query"]>;
export type GetDisclosurePolicyParams = operations["getDisclosurePolicy"]["parameters"]["path"];
export type ReplaceDisclosurePolicyParams = operations["replaceDisclosurePolicy"]["parameters"]["path"];
export type SimulateDisclosurePolicyParams = operations["simulateDisclosurePolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPortPartiesResponse = operations["listPortParties"]["responses"]["200"]["content"]["application/json"];
export type CreatePortPartyResponse = operations["createPortParty"]["responses"]["201"]["content"]["application/json"];
export type GetPortPartyResponse = operations["getPortParty"]["responses"]["200"]["content"]["application/json"];
export type UpdatePortPartyResponse = operations["updatePortParty"]["responses"]["200"]["content"]["application/json"];
export type InvitePortPartyResponse = operations["invitePortParty"]["responses"]["200"]["content"]["application/json"];
export type ListDisclosurePoliciesResponse = operations["listDisclosurePolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateDisclosurePolicyResponse = operations["createDisclosurePolicy"]["responses"]["201"]["content"]["application/json"];
export type GetDisclosurePolicyResponse = operations["getDisclosurePolicy"]["responses"]["200"]["content"]["application/json"];
export type ReplaceDisclosurePolicyResponse = operations["replaceDisclosurePolicy"]["responses"]["200"]["content"]["application/json"];
export type SimulateDisclosurePolicyResponse = operations["simulateDisclosurePolicy"]["responses"]["200"]["content"]["application/json"];


