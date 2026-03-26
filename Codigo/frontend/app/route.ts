import { NextResponse } from 'next/server';

export async function GET() {
  // Para a API oficial do Instagram Graph, você precisa desses dois dados:
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  // Fallback: Seus dados atuais caso a API falhe ou não esteja configurada ainda
  const fallbackData = {
    followers: 1796,
    views: 152706
  };

  if (!accessToken || !accountId) {
    return NextResponse.json(fallbackData);
  }

  try {
    // Busca os dados da conta usando a Instagram Graph API
    const res = await fetch(`https://graph.facebook.com/v18.0/${accountId}?fields=followers_count&access_token=${accessToken}`, {
      next: { revalidate: 3600 } // Cache de 1 hora
    });
    const data = await res.json();

    if (data.followers_count) {
      return NextResponse.json({
        followers: data.followers_count,
        views: fallbackData.views // Mantemos os views estáticos pois a API do IG não fornece esse total facilmente
      });
    }
    
    return NextResponse.json(fallbackData);
  } catch (error) {
    return NextResponse.json(fallbackData);
  }
}