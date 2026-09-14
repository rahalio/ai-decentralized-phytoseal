/**
 * ID Generator Service Implementation — Phytoseal prefixes.
 */

import type { DomainCode } from '@phytoseal/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@phytoseal/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@phytoseal/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  ptyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.portParty);
  }
  crtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.certificate);
  }
  amdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.amendment);
  }
  clsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.classification);
  }
  hldId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.legalHold);
  }
  evdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.evidencePack);
  }
  mtrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.metrics);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
