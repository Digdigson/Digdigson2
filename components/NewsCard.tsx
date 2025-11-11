import Image from 'next/image';

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
  const formattedDate = formatDate(item.dateISO);
  const youtubeId = !item.image ? getYoutubeId(item.url) : null;
  const computedImage = item.image ?? (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : FALLBACK_SRC);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block cursor-pointer rounded-2xl border border-white/10 bg-white/[0.05] transition-transform duration-200 hover:-translate-y-[2px] hover:border-white/20 hover:bg-white/[0.1] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20"
      role="article"
      aria-label={`${item.title} - yeni sekmede ac`}
    >
      {computedImage ? (
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={computedImage}
            alt={item.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        </div>
      ) : null}

      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-white md:text-xl">{item.title}</h3>
        {item.overview ? (
          <p
            className="mt-2 text-sm text-white/70"
            style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden' }}
          >
            {item.overview}
          </p>
        ) : null}

        {(item.source || formattedDate) && (
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
            {item.source ? <span className="truncate">{item.source}</span> : null}
            {item.source && formattedDate ? <span aria-hidden="true">{String.fromCharCode(8226)}</span> : null}
            {formattedDate ? <time dateTime={item.dateISO}>{formattedDate}</time> : null}
            <span className="ml-auto text-base opacity-60 transition group-hover:opacity-100" aria-hidden="true">
              {String.fromCharCode(8599)}
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
