'use client';

import { motion } from 'framer-motion';

const STEPS = ['issued', 'presented', 'accepted', 'rejected', 'amended'] as const;

export function CertificateTimeline({
  status,
}: {
  status: string;
}) {
  const activeIdx = Math.max(
    0,
    STEPS.findIndex((s) => s === status || (status === 'held' && s === 'presented'))
  );

  return (
    <ol className="flex flex-wrap gap-2">
      {STEPS.map((step, i) => {
        const done = i <= activeIdx && status !== 'rejected';
        const rejected = status === 'rejected' && step === 'rejected';
        const held = status === 'held' && step === 'presented';
        return (
          <motion.li
            key={step}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className={`rounded-sm border px-3 py-1 font-mono text-xs uppercase tracking-wide ${
              rejected
                ? 'border-coral text-coral'
                : held
                  ? 'border-amber text-amber'
                  : done
                    ? 'border-seal/50 text-seal'
                    : 'border-harbour-700 text-steel'
            }`}
          >
            {step}
          </motion.li>
        );
      })}
    </ol>
  );
}
