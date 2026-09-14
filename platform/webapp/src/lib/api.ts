import { apiClient } from '@/services/shared/infrastructure/api-client';
import { unwrapDataEnvelope } from '@/services/shared/contracts';

export async function listEnvelope<T>(path: string): Promise<T[]> {
  const res = await apiClient.get<{ data?: { items?: T[] } }>(path);
  const data = unwrapDataEnvelope(res.data) as { items?: T[] };
  return data.items ?? [];
}

export async function getEnvelope<T>(path: string): Promise<T> {
  const res = await apiClient.get<{ data?: T }>(path);
  return unwrapDataEnvelope(res.data) as T;
}

export async function postEnvelope<T>(path: string, body: unknown): Promise<T> {
  const res = await apiClient.post<{ data?: T }>(path, { body });
  return unwrapDataEnvelope(res.data) as T;
}
