// src/components/TrackList.jsx
import React from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style:none;
  padding:0;
  margin:0;
  display:flex;
  flex-direction:column;
  gap:10px;
`;
const Item = styled.li`
  display:flex;
  gap:12px;
  align-items:center;
  padding:10px;
  border-radius:10px;
  cursor:pointer;
  background: ${({ active, theme }) => (active ? 'rgba(0,184,217,0.08)' : 'transparent')};
  border-left: 4px solid ${({ active, theme }) => (active ? theme.colors.primary : 'transparent')};
  transition: background 150ms, border-left 150ms;
  &:hover { background: rgba(255,255,255,0.02); }
`;
const Cover = styled.img` width:48px;height:48px;border-radius:8px;object-fit:cover; `;
const Meta = styled.div` line-height:1; h5{margin:0;} p{margin:0;font-size:12px;color:rgba(255,255,255,0.6);} `;

export default function TrackList({ tracks = [], onPlay, currentIndex = -1 }) {
  return (
    <List>
      {tracks.map((t, i) => (
        <Item key={t.id} onClick={() => onPlay(i)} active={i === currentIndex}>
          <Cover src={t.cover || "/assets/cover-placeholder.png"} alt="" />
          <Meta>
            <h5>{t.title}</h5>
            <p>{t.artist}</p>
          </Meta>
        </Item>
      ))}
    </List>
  );
}
