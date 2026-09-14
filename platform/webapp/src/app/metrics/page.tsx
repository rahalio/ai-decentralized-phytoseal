'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_METRICS } from '@/lib/demo-data';

export default function MetricsPage() {
  const m = DEMO_METRICS;
  const interactionDelta = m.baselineInteractionCount - m.interactionProxyCount;

  return (
    <div>
      <ScreenHeader
        kicker="Cycle-time metrics"
        title="Confront the 50% paperwork / 200-interaction status quo"
      >
        <button type="button" className="border border-brand/40 px-4 py-2 text-sm text-brand">
          Export period report
        </button>
      </ScreenHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Metric
          label="Median issue → accept"
          value={`${m.medianIssueToAcceptHours}h`}
          hint={`Period ${m.period}`}
        />
        <Metric
          label="Interaction proxy"
          value={String(m.interactionProxyCount)}
          hint={`${interactionDelta} below ${m.baselineInteractionCount} baseline`}
        />
        <Metric
          label="Paperwork cost share"
          value={`${m.paperworkCostSharePct}%`}
          hint="vs ~50% status quo"
        />
        <Metric
          label="Parties onboarded"
          value={String(m.partiesOnboarded)}
          hint="Backbone coverage"
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-harbour-700/70 bg-harbour-900/40 px-4 py-5">
      <p className="text-xs uppercase tracking-widest text-steel">{label}</p>
      <p className="mt-2 font-display text-3xl text-seal">{value}</p>
      <p className="mt-2 text-sm text-steel">{hint}</p>
    </div>
  );
}
