import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle = '@samuelbolaa'; // Seu handle do YouTube

  if (!apiKey) {
    return NextResponse.json({ error: 'YOUTUBE_API_KEY não configurada no .env.local.' }, { status: 500 });
  }

  try {
    // Busca os dados do canal usando o identificador (@)
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${handle}&key=${apiKey}`, {
      next: { revalidate: 3600 } // Armazena em cache e só consulta o Youtube 1x por hora (para poupar limite da API)
    });
    const data = await res.json();

    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics;
      return NextResponse.json({
        subscribers: parseInt(stats.subscriberCount, 10),
        views: parseInt(stats.viewCount, 10)
      });
    } else {
      return NextResponse.json({ error: 'Canal não encontrado.' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar dados do YouTube.' }, { status: 500 });
  }
}