import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Make It Happen — Precisou. Aconteceu.',
  description: 'A plataforma que transforma intenção em execução no mundo real.',
  openGraph: {
    title: 'Make It Happen',
    description: 'Você pede o resultado. A plataforma faz acontecer.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
