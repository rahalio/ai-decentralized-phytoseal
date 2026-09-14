/**
 * IdGeneratorService Port — Phytoseal domain prefixes.
 */

import type { DomainCode } from '@phytoseal/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  ptyId(): string;
  crtId(): string;
  amdId(): string;
  clsId(): string;
  hldId(): string;
  evdId(): string;
  mtrId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
