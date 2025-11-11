'use client';

type NewsItem = {
  title: string;
  overview?: string;
  url: string;
  image?: string;
  source?: string;
  dateISO?: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    title: "FC 26'da Turkce Spikerler Aciklandi",
    overview:
      "Webtekno, FC 26'da Ozkan Ozturk ve Ertem Sener'in spiker olacagini dogruladi; fragmandan ilk replikler paylasildi.",
    url: 'https://www.webtekno.com/fc-26-turkce-spikerler-h160322.html',
    image: '/assets/images/FC26_COVER.jpg',
    source: 'Webtekno',
    dateISO: '2025-09-09',
  },
  {
    title: 'FC 26 Turkish Commentator Trailer',
    overview: 'Official EA FC 26 reveal showcasing the Turkish commentator duo with fresh gameplay shots.',
    url: 'https://www.youtube.com/watch?v=8v8qbcGgEao',
    source: 'YouTube',
    dateISO: '2025-09-09',
  },
  {
    title: 'Studio Walkthrough',
    overview: 'Tour the studio upgrade and listen to new hardwave-meets-cinematic cues.',
    url: 'https://example.com/studio-tour',
    source: 'Studio Log',
    dateISO: '2025-04-04',
  },
];

const formatDate = (iso?: string) => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  try {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch (error) {
    return null;
  }
};

export default function News() {
  return (
    <section id="news" className="py-20 px-6 bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-white">News</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NEWS_ITEMS.map((item) => {
              const formattedDate = formatDate(item.dateISO);

              return (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="article"
                  aria-label={`${item.title} - yeni sekmede ac`}
                  className="group block cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] transition-transform duration-200 hover:-translate-y-[2px] hover:border-white/20 hover:bg-white/[0.05] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {item.image ? (
                    <div className="aspect-[16/9] overflow-hidden rounded-t-2xl bg-white/5">
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}

                  <div className="p-5">
                    <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">
                      {item.title}
                    </h3>

                    {item.overview ? (
                      <p
                        className="mt-2 text-sm text-white/75"
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          overflow: 'hidden',
                        }}
                      >
                        {item.overview}
                      </p>
                    ) : null}

                    {(item.source || formattedDate) && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                        {item.source ? <span className="truncate">{item.source}</span> : null}
                        {item.source && formattedDate ? (
                          <span aria-hidden="true">{'\u2022'}</span>
                        ) : null}
                        {formattedDate ? (
                          <time dateTime={item.dateISO}>{formattedDate}</time>
                        ) : null}
                        <svg
                          aria-hidden="true"
                          className="ml-auto h-4 w-4 opacity-70 transition group-hover:opacity-100"
                        >
                          <path
                            fill="currentColor"
                            d="M13 3h4v4h-2V6.41l-6.3 6.3-1.4-1.42 6.29-6.29H13V3zM5 5h5v2H7v10h10v-3h2v5H5V5z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
