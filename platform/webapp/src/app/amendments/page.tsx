'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_AMENDMENTS } from '@/lib/demo-data';

export default function AmendmentsPage() {
  return (
    <div>
      <ScreenHeader
        kicker="Governed amendments"
        title="Correct sealed certificates without breaking ledger trust"
      />
      <ul className="space-y-4">
        {DEMO_AMENDMENTS.map((a) => (
          <li
            key={a.id}
            className="border border-harbour-700/70 bg-harbour-900/40 px-4 py-4"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-sm text-brand">{a.id}</span>
              <span className="text-xs uppercase tracking-widest text-amber">
                {a.status}
              </span>
            </div>
            <p className="text-sm text-ink">{a.rationale}</p>
            <dl className="mt-3 grid gap-1 font-mono text-xs text-steel md:grid-cols-2">
              <div>
                Certificate: <span className="text-ink">{a.certificateId}</span>
              </div>
              <div>
                Prior hash: <span className="text-ink">{a.priorPayloadHash}</span>
              </div>
              <div>
                New hash: <span className="text-seal">{a.newPayloadHash}</span>
              </div>
            </dl>
            <div className="mt-4 flex gap-2">
              <button type="button" className="border border-seal/40 px-3 py-1.5 text-sm text-seal">
                Approve
              </button>
              <button type="button" className="border border-coral/40 px-3 py-1.5 text-sm text-coral">
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
