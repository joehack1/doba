# React + Vite
This project is a small Spotify-like music player built with React and Vite.

Features
- Dark, responsive UI inspired by Spotify (sidebar, main content, player at bottom).
- Search and discover music using the iTunes Search API (client-side). 
- Plays iTunes preview audio (30-second previews) and shows artwork when available.
- Dynamic library sections: Featured, Recently Played, Playlists, and All Tracks.
- Vibrant gradients and hover/active states for a modern look.

Quick start

1. Install dependencies:

```pwsh
npm install
```

2. Run the dev server:

```pwsh
npm run dev
```

3. Open the URL printed by Vite (usually `http://localhost:5173`).

Usage notes
- On first load the app fetches a small seed of tracks from the iTunes Search API. Use the `Discover` button in the top-right to fetch more tracks (popular artists).
- Tracks are played directly from the iTunes `previewUrl` (30s previews). The app does not host or provide full songs.
- Artwork is fetched from iTunes when available; otherwise a colorful placeholder is shown.

Why iTunes?
- iTunes Search API is public and requires no authentication for basic metadata and preview audio, making it convenient for prototypes and demos.

Caveats
- Previews are short (30 seconds) and intended for sampling only.
- For production or full-track playback you'd need licensed streaming sources or a proper music API with permission.

Next steps you might want to add
- Persist the library to `localStorage` so discovered tracks survive reloads.
- Add an "Import by artist" input to fetch specific artists.
- Loading indicators and error UI for network requests.

If you'd like, I can implement any of the next steps above — tell me which one to add.
