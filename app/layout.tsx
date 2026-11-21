import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saans (साँस) — GenAI Winter Smog & Urban Pollution Companion',
  description: 'AI-powered shield for families navigating winter smog, thermal inversions, and toxic air pollution with certified protective gear guides, low-emission daily routines, and DIY IAQ hacks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
