import { NextResponse } from 'next/server';

function isInstagram(url: string): boolean {
  try {
    return new URL(url).hostname.toLowerCase().includes('instagram.com');
  } catch (error) {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { url } = (await req.json()) as { url?: string };

    if (!url) {
      return NextResponse.json({ ok: false, error: 'No url' }, { status: 400 });
    }

    if (isInstagram(url)) {
      const oembed = new URL('https://www.instagram.com/oembed/');
      oembed.searchParams.set('url', url);
      oembed.searchParams.set('omitscript', 'true');

      const response = await fetch(oembed.toString(), {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, error: oEmbed  },
          { status: 502 },
        );
      }

      const data = (await response.json()) as { thumbnail_url?: string };

      return NextResponse.json({ ok: true, thumbnail: data.thumbnail_url ?? null });
    }

    return NextResponse.json({ ok: true, thumbnail: null });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'error' },
      { status: 500 },
    );
  }
}
