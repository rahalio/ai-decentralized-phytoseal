'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_PARTIES } from '@/lib/demo-data';

export default function PartiesPage() {
  return (
    <div>
      <ScreenHeader
        kicker="Platform ops"
        title="One backbone connection — without replacing TOS overnight"
      >
        <button type="button" className="border border-brand/40 px-4 py-2 text-sm text-brand">
          Invite party
        </button>
      </ScreenHeader>
      <ul className="space-y-3">
        {DEMO_PARTIES.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 border border-harbour-700/70 bg-harbour-900/40 px-4 py-4"
          >
            <div>
              <p className="font-display text-lg text-ink">{p.name}</p>
              <p className="font-mono text-xs text-steel">
                {p.id} · {p.partyType}
              </p>
              <p className="mt-1 text-xs text-steel">
                Classes: {p.documentClassesEnabled.join(', ') || 'none yet'}
              </p>
            </div>
            <span
              className={`text-sm ${
                p.integrationStatus === 'connected'
                  ? 'text-seal'
                  : p.integrationStatus === 'error'
                    ? 'text-coral'
                    : 'text-amber'
              }`}
            >
              {p.integrationStatus}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-steel">
        TOS coexistence: parties keep their terminal OS; Phytoseal is the certificate backbone.
      </p>
    </div>
  );
}
