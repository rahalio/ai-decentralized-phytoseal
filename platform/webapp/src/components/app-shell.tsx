'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { LegalHoldBanner } from '@/components/legal-hold-banner';

const NAV = [
  { href: '/', label: 'Clerk home' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/presentation', label: 'Presentation' },
  { href: '/amendments', label: 'Amendments' },
  { href: '/classifications', label: 'Classification queue' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/parties', label: 'Port parties' },
  { href: '/disclosure', label: 'Disclosure' },
  { href: '/legal-holds', label: 'Legal holds' },
  { href: '/metrics', label: 'Cycle-time' },
  { href: '/evidence', label: 'AEO evidence' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { signedIn, signOut } = useAuth();
  const isLogin = pathname === '/login';

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b border-harbour-700/60 px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-wide text-brand">
          Phytoseal
        </Link>
        {signedIn ? (
          <button
            type="button"
            className="text-sm text-steel hover:text-ink"
            onClick={signOut}
          >
            Sign out
          </button>
        ) : (
          <Link href="/login" className="text-sm text-steel hover:text-ink">
            Sign in
          </Link>
        )}
      </header>
      <div className="flex">
        <nav className="min-h-[calc(100vh-65px)] w-56 shrink-0 border-r border-harbour-700/60 px-3 py-6">
          {NAV.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-1 block px-3 py-2 text-sm ${
                  active
                    ? 'bg-harbour-900 text-ink'
                    : 'text-steel hover:text-ink'
                }`}
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="min-w-0 flex-1 px-8 py-8">
          <LegalHoldBanner />
          {children}
        </main>
      </div>
    </div>
  );
}
