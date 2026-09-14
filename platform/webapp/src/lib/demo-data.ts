export type CertificateStatus =
  | 'draft'
  | 'issued'
  | 'presented'
  | 'accepted'
  | 'rejected'
  | 'amended'
  | 'held';

export type CertificateRow = {
  id: string;
  certificateType: 'phytosanitary' | 'related_authorisation';
  status: CertificateStatus;
  payloadHash: string;
  exportAuthorityId: string;
  importAuthorityId?: string;
  shipmentRef: string;
  legalHoldId?: string;
  updatedAt: string;
};

export type CertificateEventRow = {
  id: string;
  certificateId: string;
  eventType:
    | 'issued'
    | 'presented'
    | 'accepted'
    | 'rejected'
    | 'amended'
    | 'hold_placed'
    | 'hold_released';
  occurredAt: string;
  actorId: string;
  detail?: string;
};

export type ClassificationRow = {
  id: string;
  materialDescription: string;
  materialNumber?: string;
  proposedHsCode?: string;
  proposedEccn?: string;
  confidence?: number;
  rationale?: string;
  status: 'proposed' | 'approved' | 'overridden' | 'rejected' | 'deferred';
  finalHsCode?: string;
  brokerAnnotation?: string;
  backlogAgeHours: number;
};

export type PortPartyRow = {
  id: string;
  name: string;
  partyType: 'shipper' | 'forwarder' | 'terminal' | 'broker' | 'nppo' | 'customs' | 'platform';
  disclosureProfile?: string;
  integrationStatus: 'pending' | 'connected' | 'error';
  documentClassesEnabled: string[];
};

export type DisclosurePolicyRow = {
  id: string;
  name: string;
  documentClass: string;
  status: 'draft' | 'published';
  rules: { partyRole: string; visibleFields: string[] }[];
};

export type LegalHoldRow = {
  id: string;
  jurisdiction: string;
  rationale: string;
  status: 'active' | 'released';
  affectedCertificateIds: string[];
  createdAt: string;
};

export type AmendmentRow = {
  id: string;
  certificateId: string;
  rationale: string;
  newPayloadHash: string;
  priorPayloadHash?: string;
  status: 'proposed' | 'approved' | 'rejected';
  createdAt: string;
};

export type KnowledgeRow = {
  id: string;
  materialPattern: string;
  annotation: string;
  linkedProposalId?: string;
  promotedToPlaybook: boolean;
};

export type EvidencePackRow = {
  id: string;
  period: string;
  partyId?: string;
  packHash: string;
  certificateCount: number;
  classificationReviewCount: number;
  status: 'generating' | 'ready' | 'failed';
};

export type CycleTimeMetrics = {
  period: string;
  medianIssueToAcceptHours: number;
  interactionProxyCount: number;
  paperworkCostSharePct: number;
  partiesOnboarded: number;
  baselineInteractionCount: number;
};

export const DEMO_CERTIFICATES: CertificateRow[] = [
  {
    id: 'crt_ant_ephyto_8841',
    certificateType: 'phytosanitary',
    status: 'presented',
    payloadHash: 'sha256:7c2a…b91e',
    exportAuthorityId: 'nppo_be_favv',
    importAuthorityId: 'nppo_nl_nvwa',
    shipmentRef: 'ANT-2026-4412',
    updatedAt: '2026-09-14T08:12:00Z',
  },
  {
    id: 'crt_ant_ephyto_8830',
    certificateType: 'phytosanitary',
    status: 'accepted',
    payloadHash: 'sha256:11af…90c2',
    exportAuthorityId: 'nppo_be_favv',
    importAuthorityId: 'nppo_de_bvl',
    shipmentRef: 'ANT-2026-4398',
    updatedAt: '2026-09-13T16:40:00Z',
  },
  {
    id: 'crt_ant_ephyto_8822',
    certificateType: 'phytosanitary',
    status: 'held',
    payloadHash: 'sha256:55d1…ee04',
    exportAuthorityId: 'nppo_be_favv',
    importAuthorityId: 'nppo_uk_defra',
    shipmentRef: 'ANT-2026-4371',
    legalHoldId: 'hld_uk_dual_use',
    updatedAt: '2026-09-12T11:05:00Z',
  },
  {
    id: 'crt_ant_auth_120',
    certificateType: 'related_authorisation',
    status: 'issued',
    payloadHash: 'sha256:aa91…4410',
    exportAuthorityId: 'nppo_be_favv',
    shipmentRef: 'ANT-2026-4401',
    updatedAt: '2026-09-14T06:22:00Z',
  },
];

export const DEMO_EVENTS: CertificateEventRow[] = [
  {
    id: 'cev_1',
    certificateId: 'crt_ant_ephyto_8841',
    eventType: 'issued',
    occurredAt: '2026-09-14T07:01:00Z',
    actorId: 'nppo_be_favv',
  },
  {
    id: 'cev_2',
    certificateId: 'crt_ant_ephyto_8841',
    eventType: 'presented',
    occurredAt: '2026-09-14T08:12:00Z',
    actorId: 'fwd_mps_clerk',
    detail: 'Presented to nppo_nl_nvwa',
  },
  {
    id: 'cev_3',
    certificateId: 'crt_ant_ephyto_8822',
    eventType: 'hold_placed',
    occurredAt: '2026-09-12T11:05:00Z',
    actorId: 'ops_platform',
    detail: 'UK dual-use jurisdiction unclear',
  },
];

export const DEMO_CLASSIFICATIONS: ClassificationRow[] = [
  {
    id: 'cls_mdm_20041',
    materialDescription: 'Frozen cut roses, stem length 50–60cm, Ecuador origin',
    materialNumber: 'MDM-20041',
    proposedHsCode: '0603.11',
    proposedEccn: 'EAR99',
    confidence: 0.91,
    rationale: 'Cut flowers fresh/chilled; roses specific subheading.',
    status: 'proposed',
    backlogAgeHours: 6,
  },
  {
    id: 'cls_mdm_20088',
    materialDescription: 'Dried botanical extract for fragrance precursor',
    materialNumber: 'MDM-20088',
    proposedHsCode: '3301.29',
    confidence: 0.62,
    rationale: 'Low confidence — may be 1302 vs 3301; broker override likely.',
    status: 'proposed',
    backlogAgeHours: 28,
  },
  {
    id: 'cls_mdm_19902',
    materialDescription: 'Potted citrus nursery stock',
    materialNumber: 'MDM-19902',
    proposedHsCode: '0602.20',
    confidence: 0.87,
    status: 'overridden',
    finalHsCode: '0602.90',
    brokerAnnotation: 'Live plants other — citrus nursery falls under 0602.90 for this lane.',
    backlogAgeHours: 2,
  },
];

export const DEMO_PARTIES: PortPartyRow[] = [
  {
    id: 'pty_mps',
    name: 'MPS Forwarding Antwerp',
    partyType: 'forwarder',
    disclosureProfile: 'dpl_ephyto_default',
    integrationStatus: 'connected',
    documentClassesEnabled: ['phytosanitary'],
  },
  {
    id: 'pty_favv',
    name: 'FAVV / NPPO Belgium',
    partyType: 'nppo',
    integrationStatus: 'connected',
    documentClassesEnabled: ['phytosanitary', 'related_authorisation'],
  },
  {
    id: 'pty_terminal_a',
    name: 'Quay Terminal North',
    partyType: 'terminal',
    integrationStatus: 'pending',
    documentClassesEnabled: [],
  },
];

export const DEMO_DISCLOSURE: DisclosurePolicyRow[] = [
  {
    id: 'dpl_ephyto_default',
    name: 'ePhyto default disclosure',
    documentClass: 'phytosanitary',
    status: 'published',
    rules: [
      { partyRole: 'forwarder', visibleFields: ['status', 'payloadHash', 'shipmentRef'] },
      { partyRole: 'nppo', visibleFields: ['status', 'payloadHash', 'shipmentRef', 'parties'] },
      { partyRole: 'terminal', visibleFields: ['status', 'shipmentRef'] },
    ],
  },
];

export const DEMO_HOLDS: LegalHoldRow[] = [
  {
    id: 'hld_uk_dual_use',
    jurisdiction: 'UK / BE dual presentation',
    rationale: 'Import legal basis unclear pending counsel note',
    status: 'active',
    affectedCertificateIds: ['crt_ant_ephyto_8822'],
    createdAt: '2026-09-12T11:05:00Z',
  },
];

export const DEMO_AMENDMENTS: AmendmentRow[] = [
  {
    id: 'amd_4412_01',
    certificateId: 'crt_ant_ephyto_8841',
    rationale: 'Correct botanical name spelling on sealed payload',
    newPayloadHash: 'sha256:9bb0…c113',
    priorPayloadHash: 'sha256:7c2a…b91e',
    status: 'proposed',
    createdAt: '2026-09-14T09:00:00Z',
  },
];

export const DEMO_KNOWLEDGE: KnowledgeRow[] = [
  {
    id: 'kna_citrus_nursery',
    materialPattern: 'citrus nursery / potted',
    annotation: 'Prefer 0602.90 for live citrus nursery on this corridor.',
    linkedProposalId: 'cls_mdm_19902',
    promotedToPlaybook: true,
  },
];

export const DEMO_EVIDENCE: EvidencePackRow[] = [
  {
    id: 'evd_2026q2_mps',
    period: '2026-Q2',
    partyId: 'pty_mps',
    packHash: 'sha256:e0f1…aa22',
    certificateCount: 128,
    classificationReviewCount: 46,
    status: 'ready',
  },
];

export const DEMO_METRICS: CycleTimeMetrics = {
  period: '2026-09',
  medianIssueToAcceptHours: 18.4,
  interactionProxyCount: 42,
  paperworkCostSharePct: 31,
  partiesOnboarded: 14,
  baselineInteractionCount: 200,
};
