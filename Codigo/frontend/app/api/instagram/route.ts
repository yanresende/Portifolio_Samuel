import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID?.trim();

  const fallbackData = {
    followers: 10000,
    views: 20000,
  };

  const hasPlaceholderToken = !accessToken || accessToken.startsWith('seu_') || accessToken.startsWith('cole_aqui');
  const hasPlaceholderAccount = !accountId || accountId.startsWith('seu_') || accountId.startsWith('cole_aqui');

  if (hasPlaceholderToken || hasPlaceholderAccount) {
    return NextResponse.json(fallbackData);
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}?fields=followers_count&access_token=${accessToken}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return NextResponse.json(fallbackData);
    }

    const data = await res.json();

    if (typeof data.followers_count === 'number') {
      return NextResponse.json({
        followers: data.followers_count,
        views: fallbackData.views,
      });
    }

    return NextResponse.json(fallbackData);
  } catch {
    return NextResponse.json(fallbackData);
  }
}
