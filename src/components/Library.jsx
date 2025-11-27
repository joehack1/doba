// src/components/Library.jsx
import React from "react";
const TrackList = ({ tracks = [], onPlay = () => {} }) => {
    if (!tracks || tracks.length === 0) {
        return <Empty>No tracks in your library</Empty>;
    }

    const fmtMs = (ms) => {
        if (ms == null) return "";
        const s = Math.floor(ms / 1000);
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <List>
            {tracks.map((t, i) => (
                <Track key={t.id ?? i} onClick={() => onPlay(t)}>
                    <Meta>
                        <Title>{t.title ?? t.name ?? "Unknown"}</Title>
                        <Artist>{(t.artist || t.artists)?.toString?.() ?? t.artists?.map(a => a.name).join(", ")}</Artist>
                    </Meta>
                    <Right>
                        <Duration>{t.duration_ms ? fmtMs(t.duration_ms) : t.duration ?? ""}</Duration>
                        <PlayBtn onClick={(e) => { e.stopPropagation(); onPlay(t); }}>Play</PlayBtn>
                    </Right>
                </Track>
            ))}
        </List>
    );
};

const List = styled.div`
    display:flex;
    flex-direction:column;
    gap:8px;
`;

const Track = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px;
    border-radius:6px;
    cursor:pointer;
    transition:background .12s;
    &:hover{ background: rgba(0,0,0,0.04); }
`;

const Meta = styled.div`
    display:flex;
    flex-direction:column;
    gap:4px;
`;

const Title = styled.div`
    font-weight:600;
`;

const Artist = styled.div`
    font-size:12px;
    color:#666;
`;

const Right = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
`;

const Duration = styled.div`
    font-size:12px;
    color:#666;
`;

const PlayBtn = styled.button`
    background:#1db954;
    border:none;
    color:white;
    padding:6px 10px;
    border-radius:4px;
    cursor:pointer;
    font-weight:600;
    &:hover{ opacity:0.9; }
`;

const Empty = styled.div`
    color:#666;
    padding:12px 0;
`;
import styled from "styled-components";

const Head = styled.div`
  display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;
  h3{ margin:0; }
`;

export default function Library({ tracks, onPlay, currentIndex = -1 }) {
    return (
        <>
            <Head>
                <h3>Your Library</h3>
            </Head>
            <TrackList tracks={tracks} onPlay={onPlay} currentIndex={currentIndex} />
        </>
    );
}
