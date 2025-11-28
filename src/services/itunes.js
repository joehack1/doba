// Simple iTunes Search API helper
// No auth required. Returns previewUrl, artwork and metadata mapped to our app's track shape.
export async function searchItunes(term, limit = 20) {
  const q = encodeURIComponent(term);
  const url = `https://itunes.apple.com/search?term=${q}&entity=song&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('iTunes API error');
  const data = await res.json();
  // Map iTunes fields to our track object
  const tracks = (data.results || []).map((r) => ({
    id: r.trackId || `${r.artistId}-${r.trackName}`,
    title: r.trackName,
    artist: r.artistName,
    url: r.previewUrl, // 30s preview, playable in audio element
    cover: r.artworkUrl100 ? r.artworkUrl100.replace('100x100bb', '600x600bb') : '',
    source: 'itunes',
    raw: r,
  }));
  return tracks;
}
