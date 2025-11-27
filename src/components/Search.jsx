import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  color: ${({theme}) => theme.colors.text};
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  background: rgba(255,255,255,0.02);
  &:hover {
    background: rgba(255,255,255,0.05);
  }
`;

const Cover = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
  h4 { margin: 0; font-size: 16px; color: ${({theme}) => theme.colors.text}; }
  p { margin: 0; font-size: 14px; color: ${({theme}) => theme.colors.subtext}; }
`;

const PlayBtn = styled.button`
  background: ${({theme}) => theme.colors.primary};
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  &:hover {
    background: ${({theme}) => theme.colors.primaryLight};
  }
`;

export default function Search({ tracks, onPlay, searchQuery }) {
  const [filteredTracks, setFilteredTracks] = useState(tracks);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredTracks([]);
    } else {
      const filtered = tracks.filter(track =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(filtered);
    }
  }, [searchQuery, tracks]);

  return (
    <Container>
      <Title>Search</Title>
      {searchQuery && (
        <Results>
          {filteredTracks.length > 0 ? (
            filteredTracks.map(track => (
              <TrackItem key={track.id}>
                <Cover src={track.cover} alt={track.title} />
                <Info>
                  <h4>{track.title}</h4>
                  <p>{track.artist}</p>
                </Info>
                <PlayBtn onClick={() => onPlay(track)}>Play</PlayBtn>
              </TrackItem>
            ))
          ) : (
            <p style={{ color: "rgba(255,255,255,0.6)" }}>No results found for "{searchQuery}"</p>
          )}
        </Results>
      )}
    </Container>
  );
}
