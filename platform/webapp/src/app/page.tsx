'use client';

import Link from 'next/link';
import { ScreenHeader } from '@/components/screen-header';
import { CertificateTimeline } from '@/components/certificate-timeline';
import {
  DEMO_AMENDMENTS,
  DEMO_CERTIFICATES,
  DEMO_HOLDS,
} from '@/lib/demo-data';

export default function ClerkHomePage() {
  const inFlight = DEMO_CERTIFICATES.filter((c) =>
    ['issued', 'presented', 'held', 'amended'].includes(c.status)
  );
  const counts = {
    issued: DEMO_CERTIFICATES.filter((c) => c.status === 'issued').length,
    presented: DEMO_CERTIFICATES.filter((c) => c.status === 'presented').length,
    accepted: DEMO_CERTIFICATES.filter((c) => c.status === 'accepted').length,
    rejected: DEMO_CERTIFICATES.filter((c) => c.status === 'rejected').length,
  };

  return (
    <div>
      <ScreenHeader
        kicker="Clerk home"
        title="Which ePhytos are waiting on import-side acceptance?"
      >
        <Link
          href="/certificates"
          className="border border-seal/40 px-4 py-2 text-sm text-seal"
        >
          Register certificate
        </Link>
      </ScreenHeader>

      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {(
          [
            ['Issued', counts.issued],
            ['Presented', counts.presented],
            ['Accepted', counts.accepted],
            ['Rejected', counts.rejected],
          ] as const
        ).map(([label, n]) => (
          <div key={label} className="border border-harbour-700/70 bg-harbour-900/50 px-4 py-3">
            <p className="text-xs uppercase tracking-widest text-steel">{label}</p>
            <p className="mt-1 font-display text-2xl text-ink">{n}</p>
          </div>
        ))}
      </div>

      {(DEMO_HOLDS.some((h) => h.status === 'active') ||
        DEMO_AMENDMENTS.some((a) => a.status === 'proposed')) && (
        <div className="mb-6 space-y-2 text-sm">
          {DEMO_HOLDS.filter((h) => h.status === 'active').map((h) => (
            <p key={h.id} className="text-amber">
              Legal hold {h.id} affects {h.affectedCertificateIds.length} certificate(s).
            </p>
          ))}
          {DEMO_AMENDMENTS.filter((a) => a.status === 'proposed').map((a) => (
            <p key={a.id} className="text-steel">
              Amendment request open on{' '}
              <Link href="/amendments" className="text-brand underline-offset-4 hover:underline">
                {a.certificateId}
              </Link>
            </p>
          ))}
        </div>
      )}

      <section>
        <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-steel">
          In-flight certificates
        </h2>
        {inFlight.length === 0 ? (
          <p className="text-steel">Register the first ePhyto to open the berth.</p>
        ) : (
          <ul className="space-y-3">
            {inFlight.map((c) => (
              <li
                key={c.id}
                className="border border-harbour-700/70 bg-harbour-900/40 px-4 py-4"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <Link
                    href={`/certificates?id=${c.id}`}
                    className="font-mono text-sm text-brand hover:underline"
                  >
                    {c.id}
                  </Link>
                  <span className="font-mono text-xs text-steel">{c.shipmentRef}</span>
                </div>
                <CertificateTimeline status={c.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
