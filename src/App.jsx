import React, { useState, useRef } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import Sidebar from "./components/Sidebar";
import Library from "./components/Library";
import Player from "./components/Player";
import SearchBar from "./components/SearchBar";

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
  // import mp3s from local assets
  // Note: Vite will process these imports and return URLs
  const track1 = new URL("./assets/Diamond-Platnumz-Bum-Bum.mp3", import.meta.url).href;
  const track2 = new URL("./assets/Diamond-Platnumz-Kamwambie.mp3", import.meta.url).href;
  const track3 = new URL("./assets/Lucky-Dube-Back-To-My-Roots-Live.mp3", import.meta.url).href;
  const track4 = new URL("./assets/Lucky-Dube-Can-t-Blame-You.mp3", import.meta.url).href;
  const track5 = new URL("./assets/Lucky-Dube-Respect.mp3", import.meta.url).href;

  // Import images for album art
  const img1 = new URL("./assets/67221.jpg", import.meta.url).href;
  const img2 = new URL("./assets/4038793.jpg", import.meta.url).href;
  const img3 = new URL("./assets/10645800.jpg", import.meta.url).href;
  const img4 = new URL("./assets/ntfo_4pun_220302.jpg", import.meta.url).href;
  const img5 = new URL("./assets/SL-123119-26540-18.jpg", import.meta.url).href;

  const images = [img1, img2, img3, img4, img5];

  // Shuffle function to randomize album art assignment
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledImages = shuffleArray([...images]);

  const [tracks] = useState([
    { id: 1, title: "Bum Bum", artist: "Diamond Platnumz", url: track1, cover: shuffledImages[0], duration: 0 },
    { id: 2, title: "Kamwambie", artist: "Diamond Platnumz", url: track2, cover: shuffledImages[1], duration: 0 },
    { id: 3, title: "Back To My Roots (Live)", artist: "Lucky Dube", url: track3, cover: shuffledImages[2], duration: 0 },
    { id: 4, title: "Can't Blame You", artist: "Lucky Dube", url: track4, cover: shuffledImages[3], duration: 0 },
    { id: 5, title: "Respect", artist: "Lucky Dube", url: track5, cover: shuffledImages[4], duration: 0 },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);

  const filteredTracks = React.useMemo(() => {
    if (!search) return tracks;
    const q = search.toLowerCase();
    return tracks.filter(t => (t.title || "").toLowerCase().includes(q) || (t.artist || "").toLowerCase().includes(q));
  }, [search, tracks]);

  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Layout>
        <Sidebar onSearchClick={() => searchInputRef.current?.focus?.()} />
        <Main>
          <SearchBar inputRef={searchInputRef} onSearch={(q) => setSearch(q)} />
          <Library tracks={filteredTracks} currentIndex={currentIndex} onPlay={(i) => setCurrentIndex(i)} />
        </Main>

        <Player
          tracks={filteredTracks}
          currentIndex={currentIndex}
          onNext={() => setCurrentIndex((i) => (i + 1) % filteredTracks.length)}
          onPrev={() => setCurrentIndex((i) => (i - 1 + filteredTracks.length) % filteredTracks.length)}
          style={{ gridColumn: "1 / -1", marginTop: 0 }}
        />
      </Layout>
    </ThemeProvider>
  );
}
