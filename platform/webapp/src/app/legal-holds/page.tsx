'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_HOLDS } from '@/lib/demo-data';

export default function LegalHoldsPage() {
  return (
    <div>
      <ScreenHeader
        kicker="Legal holds"
        title="Suspend auto-presentation when multi-jurisdiction law is unclear"
      >
        <button type="button" className="border border-amber/50 px-4 py-2 text-sm text-amber">
          Place hold
        </button>
      </ScreenHeader>
      {DEMO_HOLDS.length === 0 ? (
        <p className="text-steel">No active holds.</p>
      ) : (
        <ul className="space-y-3">
          {DEMO_HOLDS.map((h) => (
            <li
              key={h.id}
              className="border border-amber/30 bg-harbour-900/40 px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-sm text-brand">{h.id}</span>
                <span className="text-xs uppercase tracking-widest text-amber">
                  {h.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink">{h.jurisdiction}</p>
              <p className="mt-1 text-sm text-steel">{h.rationale}</p>
              <p className="mt-3 font-mono text-xs text-steel">
                Affected: {h.affectedCertificateIds.join(', ')}
              </p>
              {h.status === 'active' ? (
                <button
                  type="button"
                  className="mt-3 border border-harbour-700 px-3 py-1.5 text-sm text-steel"
                >
                  Release hold
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
