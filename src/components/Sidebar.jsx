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

export default function Sidebar({ onSearchClick = () => {} }){
  return (
    <Box>
      <Logo>Purpleify</Logo>
      <Nav>
        <button><FaHome /> Home</button>
        <button onClick={onSearchClick}><FaSearch /> Search</button>
        <button><FaMusic /> Library</button>
      </Nav>
      <div style={{ marginTop: "auto", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
        Built with ❤️ React
      </div>
    </Box>
  );
}
