import NewsCard from '@/components/NewsCard';
import type { NewsItem } from '@/types/news';

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'fc26-turkce-spikerler',
    title: "FC 26'da Turkce Spikerler Aciklandi",
    overview:
      "Webtekno, FC 26'da Ozkan Ozturk ve Ertem Sener'in spiker olacagini dogruladi; fragmandan ilk replikler paylasildi.",
    url: 'https://www.webtekno.com/fc-26-turkce-spikerler-h160322.html',
    image: '/assets/images/FC26_COVER.jpg',
    source: 'Webtekno',
    dateISO: '2025-09-09',
    type: 'article',
  },
  {
    id: 'fc26-commentator-trailer',
    title: 'FC 26 Turkish Commentator Trailer',
    overview: 'Official EA FC 26 reveal showcasing the Turkish commentator duo with fresh gameplay shots.',
    url: 'https://www.youtube.com/watch?v=8v8qbcGgEao',
    source: 'YouTube',
    dateISO: '2025-09-09',
    type: 'video',
  },
  {
    id: 'studio-walkthrough',
    title: 'Studio Walkthrough',
    overview: 'Tour the studio upgrade and listen to new hardwave-meets-cinematic cues.',
    url: 'https://example.com/studio-tour',
    source: 'Studio Log',
    dateISO: '2025-04-04',
    type: 'article',
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
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
