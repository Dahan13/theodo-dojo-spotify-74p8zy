import logo from './assets/logo.svg';
import './App.css';
import { useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { SavedTrack } from 'spotify-types';

const trackUrls = [
  'https://p.scdn.co/mp3-preview/742294f35af9390e799dd96c633788410a332e52',
  'https://p.scdn.co/mp3-preview/5a12483aa3b51331aba663131dbac967ccb33d99',
  'https://p.scdn.co/mp3-preview/31f65b6a613010f22316c7be335b62226cf2f263',
  'https://p.scdn.co/mp3-preview/0f6b8a3524ec410020457da4cdd7717f9addce2f',
  'https://p.scdn.co/mp3-preview/ac28d1b0be285ed3bfd8e9fa5fad133776d7cf36',
];

const App = () => {
  const [trackIndex, setTrackIndex] = useState(0);

  const { data: tracks, isLoading } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  const goToNextTrack = () => {
    if (trackIndex + 1 >= tracks?.length) {
      setTrackIndex(0);
    } else {
      setTrackIndex(trackIndex + 1);
    }
  };

  const getNextTrack = (increment: number): number => {
    if (trackIndex + increment >= tracks?.length) {
      return 0;
    } else {
      return trackIndex + increment;
    }
  };

  const getResult = (id: number): void => {
    if (id == trackIndex) {
      alert('Bravo !');
    } else {
      alert('Lost ! Try Again !');
    }
  };

  const AlbumCover = (index: Object) => {
    const src = '' + tracks?.[index?.track]?.track?.album?.images[0]?.url;
    return <img src={src} style={{ width: 400, height: 400, margin: 10 }} />;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          Bienvenue sur le blind test codé par un Dieu
        </h1>
      </header>
      {isLoading ? (
        <h1 className="App-title">LOADING....</h1>
      ) : (
        <>
          <div className="App-images">
            <p>{isLoading}</p>
            <p> Il y a {tracks?.length} musiques disponibles </p>
            <p>
              Le nom de la musique est : {tracks?.[trackIndex]?.track?.name}
            </p>
            <audio
              src={tracks?.[trackIndex]?.track?.preview_url}
              autoPlay
              controls
            />
            <button onClick={goToNextTrack}>Next track</button>
          </div>
          <AlbumCover track={trackIndex} />
          <div className="App-buttons">
            <button onClick={getResult(getNextTrack(1))}> {tracks?.[getNextTrack(1)]?.track?.name} </button>
            <button onClick={getResult(getNextTrack(1))}> {tracks?.[getNextTrack(2)]?.track?.name} </button>
            <button onClick={getResult(getNextTrack(1))}> {tracks?.[getNextTrack(3)]?.track?.name} </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
