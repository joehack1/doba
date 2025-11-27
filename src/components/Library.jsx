// src/components/Library.jsx
import React from "react";
import styled from "styled-components";

const List = styled.div`
    display:flex;
    flex-direction:column;
    gap:12px;
`;

const Track = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:16px;
    border-radius:12px;
    cursor:pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    border: 1px solid rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    &:hover {
        background: linear-gradient(135deg, rgba(0,184,217,0.1), rgba(156,39,176,0.05));
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,184,217,0.15);
        border-color: rgba(0,184,217,0.3);
    }
`;

const Meta = styled.div`
    display:flex;
    align-items:center;
    gap:16px;
    flex:1;
`;

const Cover = styled.img`
    width:48px;
    height:48px;
    border-radius:8px;
    object-fit:cover;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

const TextInfo = styled.div`
    display:flex;
    flex-direction:column;
    gap:4px;
`;

const Title = styled.div`
    font-weight:600;
    font-size:16px;
    color: ${({theme}) => theme.colors.text};
`;

const Artist = styled.div`
    font-size:14px;
    color: ${({theme}) => theme.colors.subtext};
`;

const Right = styled.div`
    display:flex;
    align-items:center;
    gap:16px;
`;

const Duration = styled.div`
    font-size:14px;
    color: ${({theme}) => theme.colors.subtext};
`;

const PlayBtn = styled.button`
    background: linear-gradient(135deg, #00B8D9, #00FFF1);
    border:none;
    color:white;
    padding:8px 16px;
    border-radius:20px;
    cursor:pointer;
    font-weight:600;
    font-size:14px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,184,217,0.3);
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(0,184,217,0.4);
    }
`;

const Empty = styled.div`
    color:#666;
    padding: 20px;
`;

const Head = styled.div`
  display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;
  h3{ margin:0; }
`;

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
                        <Cover src={t.cover || "/assets/cover-placeholder.png"} alt="cover" />
                        <TextInfo>
                            <Title>{t.title ?? t.name ?? "Unknown"}</Title>
                            <Artist>{t.artist || (t.artists?.map(a => a.name).join(", ")) || "Unknown"}</Artist>
                        </TextInfo>
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

export default function Library({ tracks, onPlay, currentIndex = -1 }) {
    return (
        <>
            <Head>
                <h3>Your Library</h3>
            </Head>
            <TrackList tracks={tracks} onPlay={onPlay} />
        </>
    );
}
