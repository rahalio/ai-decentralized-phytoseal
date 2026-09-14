'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ScreenHeader } from '@/components/screen-header';
import { CertificateTimeline } from '@/components/certificate-timeline';
import { DEMO_CERTIFICATES, DEMO_EVENTS } from '@/lib/demo-data';

function CertificatesInner() {
  const params = useSearchParams();
  const selectedId = params.get('id') ?? DEMO_CERTIFICATES[0]?.id;
  const selected = useMemo(
    () => DEMO_CERTIFICATES.find((c) => c.id === selectedId) ?? DEMO_CERTIFICATES[0],
    [selectedId]
  );
  const [flash, setFlash] = useState(false);
  const events = DEMO_EVENTS.filter((e) => e.certificateId === selected?.id);

  return (
    <div>
      <ScreenHeader
        kicker="Certificates"
        title="Sealed payload and presentation timeline"
      >
        <button
          type="button"
          className="border border-seal/40 px-4 py-2 text-sm text-seal"
          onClick={() => {
            setFlash(true);
            window.setTimeout(() => setFlash(false), 180);
          }}
        >
          Present to import NPPO
        </button>
      </ScreenHeader>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <h2 className="mb-3 text-xs uppercase tracking-widest text-steel">
            Register / list
          </h2>
          <ul className="space-y-2">
            {DEMO_CERTIFICATES.map((c) => (
              <li key={c.id}>
                <a
                  href={`/certificates?id=${c.id}`}
                  className={`block border px-3 py-3 font-mono text-sm ${
                    c.id === selected?.id
                      ? 'border-seal/50 bg-harbour-900'
                      : 'border-harbour-700/60 hover:border-harbour-700'
                  }`}
                >
                  <span className="text-brand">{c.id}</span>
                  <span className="mt-1 block text-xs text-steel">{c.status}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {selected ? (
          <section className={flash ? 'motion-lock' : undefined}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-xl text-brand">Phytoseal</h2>
              <span className="font-mono text-xs text-steel">{selected.shipmentRef}</span>
            </div>
            {selected.status === 'held' ? (
              <p className="mb-4 border border-amber/40 px-3 py-2 text-sm text-amber">
                Legal hold {selected.legalHoldId} — auto-presentation suspended.
              </p>
            ) : null}
            <CertificateTimeline status={selected.status} />
            <div className="mt-6 border border-harbour-700/70 bg-harbour-900/50 p-4">
              <h3 className="mb-2 text-xs uppercase tracking-widest text-steel">
                Sealed payload
              </h3>
              <p className="font-mono text-sm text-seal">{selected.payloadHash}</p>
              <dl className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-steel">Export NPPO</dt>
                  <dd className="font-mono">{selected.exportAuthorityId}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-steel">Import NPPO</dt>
                  <dd className="font-mono">{selected.importAuthorityId ?? '—'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-steel">Type</dt>
                  <dd>{selected.certificateType}</dd>
                </div>
              </dl>
            </div>
            <ol className="mt-6 space-y-2">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="border-l-2 border-seal-dim pl-3 text-sm text-steel"
                >
                  <span className="font-mono text-ink">{e.eventType}</span> ·{' '}
                  {new Date(e.occurredAt).toLocaleString()}
                  {e.detail ? <span className="block text-xs">{e.detail}</span> : null}
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  return (
    <Suspense fallback={<p className="text-steel">Loading certificates…</p>}>
      <CertificatesInner />
    </Suspense>
  );
}
