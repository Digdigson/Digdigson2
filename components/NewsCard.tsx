'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { detectProvider } from '@/utils/detectProvider';
import { getYoutubeId } from '@/utils/getYoutubeId';
import type { NewsItem } from '@/types/news';

type Props = {
  item: NewsItem;
};

const FALLBACK_SRC = '/images/news-fallback.jpg';

const formatDate = (iso?: string) => {
  if (!iso) return null;
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return date.toLocaleDateString('tr-TR');
  } catch (error) {
    return null;
  }
};

export default function NewsCard({ item }: Props) {
  const [dynamicImg, setDynamicImg] = useState<string | null>(null);

  const provider = detectProvider(item.url);
  const youtubeId = !item.image && provider === 'youtube' ? getYoutubeId(item.url) : null;
  const youtubeThumb = youtubeId ? https://i.ytimg.com/vi//hqdefault.jpg : null;

  useEffect(() => {
    let ignore = false;

    async function fetchThumbnail() {
      if (!item.image && provider === 'instagram') {
        try {
          const response = await fetch('/api/link-preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: item.url }),
          });

          if (!response.ok) {
            return;
          }

          const data = (await response.json()) as { ok?: boolean; thumbnail?: string | null };
          if (!ignore && data?.ok && data.thumbnail) {
            setDynamicImg(data.thumbnail);
          }
        } catch (error) {
          // ignore fetch failures
        }
      }
    }

    fetchThumbnail();

    return () => {
      ignore = true;
    };
  }, [item.image, item.url, provider]);

  const computedImage = item.image ?? youtubeThumb ?? dynamicImg ?? FALLBACK_SRC;
  const formattedDate = formatDate(item.dateISO);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20"
      role="article"
      aria-label={${item.title} - yeni sekmede ac}
    >
      {computedImage ? (
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={computedImage}
            alt={item.title}
            fill
            className="scale-[1.01] object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      ) : null}

      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">{item.title}</h3>
        {item.overview ? <p className="mt-2 text-sm text-white/70 line-clamp-3">{item.overview}</p> : null}
        {(item.source || formattedDate) && (
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
            {item.source ? <span>{item.source}</span> : null}
            {formattedDate ? <span>• {formattedDate}</span> : null}
            <span className="ml-auto opacity-60 transition group-hover:opacity-100" aria-hidden="true">
              ↗
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
