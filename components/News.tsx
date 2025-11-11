'use client';

const NEWS_ITEMS = [
  {
    title: 'Hybrid Soundscapes Interview',
    overview: 'A feature on building cinematic momentum with hybrid orchestration.',
    url: 'https://example.com/interview',
    actionLabel: 'Read Article',
  },
  {
    title: 'Soundtrack Spotlight',
    overview: 'Behind-the-scenes notes from the latest score release and mixing approach.',
    url: 'https://example.com/soundtrack',
    actionLabel: 'Visit Feature',
  },
  {
    title: 'Studio Walkthrough',
    overview: 'Tour the studio upgrade and listen to new hardwave-meets-cinematic cues.',
    url: 'https://example.com/studio-tour',
    actionLabel: 'Explore',
  },
];

export default function News() {
  return (
    <section id="news" className="py-20 px-6 bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-white">News</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NEWS_ITEMS.map((item) => (
              <article
                key={item.title}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed mb-4">{item.overview}</p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200 transition"
                >
                  {item.actionLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
