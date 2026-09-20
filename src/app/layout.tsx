import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sēn — MVP Prototype',
  description: 'Premium membership for real-world life: access, AI, community and value.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
