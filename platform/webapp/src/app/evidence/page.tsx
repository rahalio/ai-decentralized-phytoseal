'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_EVIDENCE } from '@/lib/demo-data';

export default function EvidencePage() {
  return (
    <div>
      <ScreenHeader
        kicker="AEO evidence"
        title="Export authenticity seals and classification review histories"
      >
        <button type="button" className="bg-seal px-4 py-2 text-sm text-harbour-950">
          Generate pack
        </button>
      </ScreenHeader>
      <div className="mb-6 border border-harbour-700/70 bg-harbour-900/40 p-5">
        <h2 className="font-display text-lg text-brand">Phytoseal</h2>
        <p className="mt-1 text-sm text-steel">
          Pack builder — period, parties, document classes. Seals + broker reviews only.
        </p>
      </div>
      <ul className="space-y-3">
        {DEMO_EVIDENCE.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 border border-harbour-700/70 px-4 py-4"
          >
            <div>
              <p className="font-mono text-sm text-brand">{p.id}</p>
              <p className="mt-1 text-sm text-steel">
                {p.period} · {p.certificateCount} certs · {p.classificationReviewCount}{' '}
                reviews
              </p>
              <p className="mt-1 font-mono text-xs text-seal">{p.packHash}</p>
            </div>
            <button
              type="button"
              className="border border-seal/40 px-3 py-1.5 text-sm text-seal"
              disabled={p.status !== 'ready'}
            >
              {p.status === 'ready' ? 'Download' : p.status}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
