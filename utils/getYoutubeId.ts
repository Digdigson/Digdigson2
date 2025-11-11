export function getYoutubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname;

    if (host.includes('youtu.be')) {
      const id = u.pathname.replace('/', '');
      return id || null;
    }

    if (host.includes('youtube.com')) {
      if (u.pathname.startsWith('/watch')) {
        return u.searchParams.get('v');
      }

      if (u.pathname.startsWith('/shorts/')) {
        const segments = u.pathname.split('/');
        return segments[2] || null;
      }
    }
  } catch (error) {
    // ignore invalid URLs
  }

  return null;
}
