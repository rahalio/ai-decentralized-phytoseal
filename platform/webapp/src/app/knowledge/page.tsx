'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_KNOWLEDGE } from '@/lib/demo-data';

export default function KnowledgePage() {
  return (
    <div>
      <ScreenHeader
        kicker="Knowledge capture"
        title="Retain broker know-how as annotations on AI proposals"
      />
      {DEMO_KNOWLEDGE.length === 0 ? (
        <p className="text-steel">Seed the library from the first overrides.</p>
      ) : (
        <ul className="space-y-3">
          {DEMO_KNOWLEDGE.map((k) => (
            <li
              key={k.id}
              className="border border-harbour-700/70 bg-harbour-900/40 px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-sm text-brand">{k.materialPattern}</span>
                {k.promotedToPlaybook ? (
                  <span className="text-xs uppercase tracking-widest text-seal">
                    Playbook
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-ink">{k.annotation}</p>
              {k.linkedProposalId ? (
                <p className="mt-2 font-mono text-xs text-steel">
                  Linked: {k.linkedProposalId}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
