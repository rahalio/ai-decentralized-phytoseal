'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_DISCLOSURE } from '@/lib/demo-data';

export default function DisclosurePage() {
  const policy = DEMO_DISCLOSURE[0];

  return (
    <div>
      <ScreenHeader
        kicker="Disclosure policies"
        title="Commercial disclosure limits between competing parties"
      >
        <button type="button" className="border border-seal/40 px-4 py-2 text-sm text-seal">
          Publish policy
        </button>
      </ScreenHeader>
      {!policy ? (
        <p className="text-steel">Default-deny until a policy is published.</p>
      ) : (
        <div className="border border-harbour-700/70 bg-harbour-900/40 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-xl text-ink">{policy.name}</h2>
            <span className="text-xs uppercase tracking-widest text-seal">
              {policy.status}
            </span>
          </div>
          <p className="mb-4 font-mono text-xs text-steel">
            Document class: {policy.documentClass}
          </p>
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-steel">
              <tr>
                <th className="pb-2 font-normal">Party role</th>
                <th className="pb-2 font-normal">Visible fields</th>
              </tr>
            </thead>
            <tbody>
              {policy.rules.map((r) => (
                <tr key={r.partyRole} className="border-t border-harbour-700/50">
                  <td className="py-3">{r.partyRole}</td>
                  <td className="py-3 font-mono text-xs text-brand">
                    {r.visibleFields.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="mt-4 text-sm text-brand underline-offset-4 hover:underline"
          >
            Simulate competitor party view
          </button>
        </div>
      )}
    </div>
  );
}
