'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_CERTIFICATES } from '@/lib/demo-data';

export default function PresentationPage() {
  const rows = DEMO_CERTIFICATES.filter((c) =>
    ['presented', 'accepted', 'rejected', 'held'].includes(c.status)
  );

  return (
    <div>
      <ScreenHeader
        kicker="NPPO liaison"
        title="Presentation status across export and import authorities"
      />
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-widest text-steel">
          <tr>
            <th className="pb-3 font-normal">Certificate</th>
            <th className="pb-3 font-normal">Shipment</th>
            <th className="pb-3 font-normal">Import NPPO</th>
            <th className="pb-3 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id} className="border-t border-harbour-700/50">
              <td className="py-3 font-mono text-brand">{c.id}</td>
              <td className="py-3 font-mono">{c.shipmentRef}</td>
              <td className="py-3 font-mono text-steel">
                {c.importAuthorityId ?? '—'}
              </td>
              <td
                className={`py-3 ${
                  c.status === 'accepted'
                    ? 'text-seal'
                    : c.status === 'held'
                      ? 'text-amber'
                      : c.status === 'rejected'
                        ? 'text-coral'
                        : 'text-ink'
                }`}
              >
                {c.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
