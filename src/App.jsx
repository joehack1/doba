import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import Sidebar from "./components/Sidebar";
import Library from "./components/Library";
import Player from "./components/Player";

const Global = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: radial-gradient(1200px 600px at 10% 10%, rgba(123,44,191,0.08), transparent),
                ${theme.colors.bg};
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  const [tracks] = useState([
    { id: 1, title: "Bum Bum", artist: "Diamond Platnumz", url: track1, cover: "/assets/cover-placeholder.png", duration: 0 },
    { id: 2, title: "Kamwambie", artist: "Diamond Platnumz", url: track2, cover: "/assets/cover-placeholder.png", duration: 0 },
    { id: 3, title: "Back To My Roots (Live)", artist: "Lucky Dube", url: track3, cover: "/assets/cover-placeholder.png", duration: 0 },
    { id: 4, title: "Can't Blame You", artist: "Lucky Dube", url: track4, cover: "/assets/cover-placeholder.png", duration: 0 },
    { id: 5, title: "Respect", artist: "Lucky Dube", url: track5, cover: "/assets/cover-placeholder.png", duration: 0 },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Layout>
        <Sidebar />
        <Main>
          <Library tracks={tracks} currentIndex={currentIndex} onPlay={(i) => setCurrentIndex(i)} />
        </Main>

        <Player
          tracks={tracks}
          currentIndex={currentIndex}
          onNext={() => setCurrentIndex((i) => (i + 1) % tracks.length)}
          onPrev={() => setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length)}
          style={{ gridColumn: "1 / -1", marginTop: 0 }}
        />
      </Layout>
    </ThemeProvider>
  );
}
