'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenHeader } from '@/components/screen-header';
import { DEMO_CLASSIFICATIONS } from '@/lib/demo-data';

export default function ClassificationsPage() {
  const queue = [...DEMO_CLASSIFICATIONS].sort(
    (a, b) => b.backlogAgeHours - a.backlogAgeHours
  );
  const [selectedId, setSelectedId] = useState(queue[0]?.id);
  const selected = queue.find((q) => q.id === selectedId) ?? queue[0];
  const [annotation, setAnnotation] = useState(selected?.brokerAnnotation ?? '');

  return (
    <div>
      <ScreenHeader
        kicker="Broker home"
        title="Human review of AI HS/HTS proposals before customs filing"
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <ul className="space-y-2">
          {queue.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(p.id);
                  setAnnotation(p.brokerAnnotation ?? '');
                }}
                className={`motion-queue w-full border px-3 py-3 text-left ${
                  p.id === selected?.id
                    ? 'border-brand/50 bg-harbour-900'
                    : 'border-harbour-700/60'
                }`}
              >
                <div className="flex justify-between gap-2">
                  <span className="font-mono text-xs text-brand">{p.materialNumber}</span>
                  <span className="text-xs text-steel">{p.backlogAgeHours}h</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-ink">
                  {p.materialDescription}
                </p>
                <p className="mt-1 font-mono text-xs text-seal">
                  {p.proposedHsCode ?? '—'} · conf{' '}
                  {p.confidence != null ? Math.round(p.confidence * 100) : '—'}%
                </p>
              </button>
            </li>
          ))}
        </ul>

        {selected ? (
          <motion.section
            key={selected.id}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="border border-harbour-700/70 bg-harbour-900/50 p-5"
          >
            <h2 className="font-display text-xl text-ink">Proposal</h2>
            <p className="mt-2 text-sm text-steel">{selected.materialDescription}</p>
            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-steel">Proposed HS</dt>
                <dd className="font-mono text-seal">{selected.proposedHsCode}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-steel">ECCN</dt>
                <dd className="font-mono">{selected.proposedEccn ?? '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-steel">Rationale</dt>
                <dd className="max-w-xs text-right text-ink">{selected.rationale}</dd>
              </div>
            </dl>
            {(selected.confidence ?? 1) < 0.7 ? (
              <p className="mt-3 text-sm text-amber">Low confidence — forced review.</p>
            ) : null}
            <label className="mt-5 block text-sm text-steel">
              Broker annotation / override reason
              <textarea
                className="mt-1 w-full border border-harbour-700 bg-harbour-950 px-3 py-2 text-ink"
                rows={3}
                value={annotation}
                onChange={(e) => setAnnotation(e.target.value)}
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="bg-seal px-3 py-2 text-sm text-harbour-950">
                Approve
              </button>
              <button type="button" className="border border-amber/50 px-3 py-2 text-sm text-amber">
                Override
              </button>
              <button type="button" className="border border-harbour-700 px-3 py-2 text-sm text-steel">
                Defer
              </button>
              <button type="button" className="border border-brand/40 px-3 py-2 text-sm text-brand">
                Push customs pre-fill
              </button>
            </div>
          </motion.section>
        ) : (
          <p className="text-steel">Caught up — no proposals waiting.</p>
        )}
      </div>
    </div>
  );
}
