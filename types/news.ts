export type NewsItem = {
  id: string;
  title: string;
  overview: string;
  url: string;
  source?: string;
  dateISO?: string;
  image?: string;
  type?: 'article' | 'video' | 'press';
};
