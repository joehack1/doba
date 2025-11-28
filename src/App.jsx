import React, { useState, useRef, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import Sidebar from "./components/Sidebar";
import Library from "./components/Library";
import Player from "./components/Player";
import TopBar from "./components/TopBar";

const Global = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: ${theme.colors.bg};
    background-attachment: fixed;
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryLight};
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 1fr auto;
  height: 100vh;
  gap: 20px;
  padding: 24px;
`;

const Main = styled.main`
  padding: 20px;
  overflow: auto;
`;

export default function App() {
  // simple playlist state: array of tracks with {id,title,artist,url,cover}
  // We'll fetch tracks from iTunes (online previews + artwork) instead of using local files.
  const [tracks, setTracks] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);

  const filteredTracks = React.useMemo(() => {
    if (!search) return tracks;
    const q = search.toLowerCase();
    return tracks.filter(t => (t.title || "").toLowerCase().includes(q) || (t.artist || "").toLowerCase().includes(q));
  }, [search, tracks]);

  // Listen for TopBar discover button event
  useEffect(() => {
    const onDiscover = () => {
      // fetch for a few popular artists and append
      fetchSeedArtists();
    };
    window.addEventListener('discover', onDiscover);
    return () => window.removeEventListener('discover', onDiscover);
  }, [tracks]);

  // Fetch initial seed tracks on mount so the library isn't empty
  useEffect(() => {
    fetchSeedArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch and append tracks from iTunes for some seed artists
  async function fetchSeedArtists() {
    try {
      const { searchItunes } = await import('./services/itunes');
      const seeds = ['Drake','Adele','Taylor Swift','Coldplay','The Weeknd','Billie Eilish'];
      const results = [];
      for (const s of seeds) {
        try {
          const r = await searchItunes(s, 12);
          results.push(...r);
        } catch (e) {
          console.warn('itunes fetch failed for', s, e.message);
        }
      }

      // dedupe by id
      const existing = new Set(tracks.map(t => String(t.id)));
      const newTracks = results.filter(t => t.url && !existing.has(String(t.id)));
      if (newTracks.length) {
        setTracks((prev) => [...prev, ...newTracks]);
      }
    } catch (err) {
      console.error('Discover failed', err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Layout>
        <Sidebar onSearchClick={() => searchInputRef.current?.focus?.()} />
        <Main>
          <TopBar inputRef={searchInputRef} onSearch={(q) => setSearch(q)} />
          <Library tracks={filteredTracks} currentIndex={currentIndex} onPlay={(i) => setCurrentIndex(i)} />
        </Main>

        <Player
          tracks={filteredTracks}
          currentIndex={currentIndex}
          onNext={() => setCurrentIndex((i) => {
            if (!filteredTracks.length) return i;
            return (i + 1) % filteredTracks.length;
          })}
          onPrev={() => setCurrentIndex((i) => {
            if (!filteredTracks.length) return i;
            return (i - 1 + filteredTracks.length) % filteredTracks.length;
          })}
          style={{ gridColumn: "1 / -1", marginTop: 0 }}
        />
      </Layout>
    </ThemeProvider>
  );
}
