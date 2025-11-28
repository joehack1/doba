import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const Header = styled.header`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 18px;
`;

const Left = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
`;

const Title = styled.h2`
  margin:0; font-size:20px; color: ${({theme}) => theme.colors.text};
`;

const Right = styled.div`
  display:flex; gap:12px; align-items:center;
`;

const Avatar = styled.div`
  width:36px; height:36px; border-radius:18px; background: linear-gradient(135deg,#6b46c1,#b794f4);
  display:inline-flex; align-items:center; justify-content:center; color:white; font-weight:700;
`;

export default function TopBar({ inputRef, onSearch = () => {} }) {
  return (
    <Header>
      <Left>
        <Title>Good evening</Title>
        <SearchBar inputRef={inputRef} onSearch={onSearch} placeholder="Search artists, songs, or playlists" />
      </Left>

      <Right>
        <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: 10 }}>Upgrade</button>
        <Avatar>J</Avatar>
      </Right>
    </Header>
  );
}
