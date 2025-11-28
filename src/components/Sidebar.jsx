import React from "react";
import styled from "styled-components";
import { FaHome, FaSearch, FaMusic } from "react-icons/fa";

const Box = styled.aside`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding: 18px;
  border-radius: 12px;
  height: calc(100vh - 48px);
  display:flex;
  flex-direction:column;
  gap:18px;
  width: 260px;
`;

const Logo = styled.h2`
  margin:0;
  font-size:18px;
  color: ${({theme}) => theme.colors.primary};
`;

const Nav = styled.nav`
  display:flex;
  flex-direction:column;
  gap:10px;
  button {
    display:flex; gap:8px; align-items:center;
    background:none; border:none; padding:8px 10px; color:inherit; cursor:pointer; border-radius:8px;
    &:hover { background: rgba(255,255,255,0.03); }
  }
`;

const PlaylistsWrap = styled.div`
  display:flex; flex-direction:column; gap:8px; max-height:260px; overflow:auto; padding-right:6px;
  &::-webkit-scrollbar { width:8px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 6px; }
`;

const PlaylistItem = styled.button`
  text-align: left;
  padding: 8px 10px;
  font-size: 13px;
  border-radius: 8px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: transform 120ms ease, background 120ms ease, box-shadow 120ms ease;
  position: relative;

  &:hover {
    background: linear-gradient(90deg, rgba(123,63,228,0.12), rgba(255,73,161,0.06));
    transform: translateX(4px);
    box-shadow: 0 6px 18px rgba(123,63,228,0.12);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 6px; bottom: 6px; width: 4px;
    background: linear-gradient(180deg, #7b3fe4, #ff49a1);
    border-radius: 4px;
    opacity: 0;
    transition: opacity 120ms ease;
  }

  &:hover::before { opacity: 1; }
`;

export default function Sidebar({ onSearchClick = () => {} }){
  return (
    <Box>
      <Logo>Purpleify</Logo>
      <Nav>
        <button><FaHome /> Home</button>
        <button onClick={onSearchClick}><FaSearch /> Search</button>
        <button><FaMusic /> Library</button>
      </Nav>
      <div>
        <h4 style={{ margin: '10px 0 8px 0' }}>Playlists</h4>
        <PlaylistsWrap>
          {Array.from({ length: 12 }).map((_, i) => (
            <PlaylistItem key={i} onClick={() => console.log('open playlist', i)}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: `linear-gradient(90deg,#7b3fe4,#ff49a1)` }} />
              Playlist {i + 1}
            </PlaylistItem>
          ))}
        </PlaylistsWrap>
      </div>

      <div style={{ marginTop: "auto", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
        Built with ❤️ React
      </div>
    </Box>
  );
}
