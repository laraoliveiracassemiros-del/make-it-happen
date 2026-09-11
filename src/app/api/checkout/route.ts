import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  if (!process.env.STRIPE_SECRET_KEY && !process.env.MERCADO_PAGO_ACCESS_TOKEN) {
    return NextResponse.json({
      demo: true,
      checkoutUrl: `${appUrl}/missions/${body.missionId ?? 'demo'}?checkout=demo`,
      message: 'Checkout demo. Adicione Stripe ou Mercado Pago para cobrança real.',
    });
  }

  return NextResponse.json({
    todo: true,
    message: 'Credenciais encontradas. Implemente aqui Stripe Checkout ou Mercado Pago Preference antes de cobrar clientes reais.',
  });
}
