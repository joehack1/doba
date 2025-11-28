// src/components/Library.jsx
import React from "react";
import styled from "styled-components";

const Head = styled.div`
    display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;
    h3{ margin:0; }
`;

const Section = styled.section`
    margin-bottom: 20px;
`;

const Grid = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
`;

const Card = styled.div`
    background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    padding:12px; border-radius:12px; display:flex; gap:12px; align-items:end; height:120px; cursor:pointer;
    transition: transform 150ms ease, box-shadow 150ms;
    &:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(0,0,0,0.45); }
`;

const Cover = styled.img`
        width:64px; height:64px; border-radius:8px; object-fit:cover; margin-left:auto; box-shadow: 0 6px 18px rgba(0,0,0,0.6);
`;

const CoverPlaceholder = styled.div`
    width:64px; height:64px; border-radius:8px; display:inline-flex; align-items:center; justify-content:center;
    background: linear-gradient(90deg,#7b3fe4,#ff49a1); color:white; font-weight:700;
`;

const SmallCard = styled.div`
    min-width:140px; height:140px; border-radius:10px; padding:12px; display:flex; flex-direction:column; justify-content:flex-end; gap:8px; cursor:pointer;
    background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
`;

const SmallCover = styled.img` width:100%; height:88px; object-fit:cover; border-radius:8px; `;

const List = styled.div`
    display:flex; flex-direction:column; gap:12px;
`;

const TrackRow = styled.div`
    display:flex; justify-content:space-between; align-items:center; padding:12px; border-radius:10px; cursor:pointer;
    background: transparent; &:hover { background: rgba(255,255,255,0.02); }
`;

const Empty = styled.div` color:#666; padding: 20px; `;

export default function Library({ tracks = [], onPlay = () => {}, currentIndex = -1 }) {
    if (!tracks || tracks.length === 0) return <Empty>No tracks in your library</Empty>;

    const featured = tracks.slice(0, 6);
    const recent = tracks.slice(0, Math.min(8, tracks.length));

    const playlists = Array.from({ length: 6 }).map((_, i) => ({
        id: `pl-${i}`,
        name: `Playlist ${i + 1}`,
        cover: tracks[i % tracks.length]?.cover,
    }));

    const fmtMs = (ms) => {
        if (ms == null) return "";
        const s = Math.floor(ms / 1000);
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <div>
            <Head>
                <h3>Your Library</h3>
            </Head>

            <Section>
                <h4 style={{ margin: "6px 0 8px 0" }}>Featured</h4>
                <Grid>
                    {featured.map((t, i) => (
                        <Card key={t.id ?? i} onClick={() => onPlay(i)}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <strong style={{ fontSize: 14 }}>{t.title}</strong>
                                <small style={{ color: "rgba(255,255,255,0.7)" }}>{t.artist}</small>
                            </div>
                            {t.cover ? (
                              <Cover src={t.cover} alt="cover" />
                            ) : (
                              <CoverPlaceholder>{(t.artist || '').charAt(0) || '♪'}</CoverPlaceholder>
                            )}
                        </Card>
                    ))}
                </Grid>
            </Section>

            <Section>
                <h4 style={{ margin: "6px 0 8px 0" }}>Recently played</h4>
                <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6 }}>
                                        {recent.map((t, i) => (
                                                <SmallCard key={t.id ?? i} onClick={() => onPlay(i)}>
                                                        {t.cover ? (
                                                            <SmallCover src={t.cover} alt="cover" />
                                                        ) : (
                                                            <div style={{ width: '100%', height: 88, borderRadius: 8, background: 'linear-gradient(90deg,#7b3fe4,#ff49a1)' }} />
                                                        )}
                                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
                                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{t.artist}</div>
                                                </SmallCard>
                                        ))}
                </div>
            </Section>

            <Section>
                <h4 style={{ margin: "6px 0 8px 0" }}>Playlists</h4>
                <Grid>
                    {playlists.map((p) => (
                        <Card key={p.id} onClick={() => console.log('open playlist', p.id)}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <strong style={{ fontSize: 14 }}>{p.name}</strong>
                                <small style={{ color: "rgba(255,255,255,0.7)" }}>{Math.floor(Math.random() * 50) + 10} songs</small>
                            </div>
                            {p.cover ? <Cover src={p.cover} alt="cover" /> : <CoverPlaceholder>{p.name.charAt(0)}</CoverPlaceholder>}
                        </Card>
                    ))}
                </Grid>
            </Section>

            <Section>
                <h4 style={{ margin: "6px 0 8px 0" }}>All tracks</h4>
                <List>
                    {tracks.map((t, i) => (
                        <TrackRow key={t.id ?? i} onClick={() => onPlay(i)}>
                                                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                                                {t.cover ? (
                                                                    <img src={t.cover} alt="cover" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                                                                ) : (
                                                                    <div style={{ width: 48, height: 48, borderRadius: 8, background: 'linear-gradient(90deg,#7b3fe4,#ff49a1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{(t.artist || '').charAt(0) || '♪'}</div>
                                                                )}
                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                        <strong style={{ fontSize: 14 }}>{t.title}</strong>
                                                                        <small style={{ color: "rgba(255,255,255,0.7)" }}>{t.artist}</small>
                                                                </div>
                                                        </div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{t.duration || fmtMs(t.duration_ms)}</div>
                        </TrackRow>
                    ))}
                </List>
            </Section>
        </div>
    );
}
