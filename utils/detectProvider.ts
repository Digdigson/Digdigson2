export type LinkProvider = 'youtube' | 'instagram' | 'generic';

export function detectProvider(url: string): LinkProvider {
  try {
    const u = new URL(url);
    const h = u.hostname.toLowerCase();

    if (h.includes('youtube.com') || h.includes('youtu.be')) {
      return 'youtube';
    }

    if (h.includes('instagram.com')) {
      return 'instagram';
    }
  } catch (error) {
    // ignore invalid URL parsing errors
  }

  return 'generic';
}

