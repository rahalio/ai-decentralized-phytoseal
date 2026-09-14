'use client';

import Link from 'next/link';
import { DEMO_HOLDS } from '@/lib/demo-data';

export function LegalHoldBanner() {
  const active = DEMO_HOLDS.filter((h) => h.status === 'active');
  if (active.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="motion-hold mb-6 border border-amber/40 bg-harbour-900 px-4 py-3 text-sm text-amber"
    >
      {active.length} active legal hold
      {active.length === 1 ? '' : 's'} suspending auto-presentation.{' '}
      <Link href="/legal-holds" className="underline underline-offset-4">
        Review holds
      </Link>
    </div>
  );
}
