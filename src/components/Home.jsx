import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Greeting = styled.h1`
  margin: 0 0 20px 0;
  color: ${({theme}) => theme.colors.text};
  font-size: 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const AlbumCard = styled.div`
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const AlbumCover = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 12px;
`;

const AlbumTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 16px;
  color: ${({theme}) => theme.colors.text};
`;

const AlbumArtist = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({theme}) => theme.colors.subtext};
`;

export default function Home({ tracks, onPlay }) {
  return (
    <Container>
      <Greeting>Good evening</Greeting>
      <Grid>
        {tracks.map(track => (
          <AlbumCard key={track.id} onClick={() => onPlay(track)}>
            <AlbumCover src={track.cover} alt={track.title} />
            <AlbumTitle>{track.title}</AlbumTitle>
            <AlbumArtist>{track.artist}</AlbumArtist>
          </AlbumCard>
        ))}
      </Grid>
    </Container>
  );
}
