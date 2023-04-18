import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQAzx5F3tsPjzJEkKPLf9Zsjv1gKTuTI2p-aVftrv35FJTAsLgLuqzpqPat8MyqtTg2H8qTpRrxEI9-DMc9oEZK5Kds_qoKmFNRsnUAvKAv5FixVorSwVZCxkOB_1eBIL1KGLRgevy-F5AiBWVpWR3gB-KcilN7sCwfKxwUgopbFm6EYKz9Zw4RDAZsP9YAG50wX-TnZR2y1wsIjiZucDE3sOViAvZNpVjoJ544JyO5WBPFPtH8xXYoDvdVwyMVBRZtYfjIMObnAOFqdBixXyoSzfQdSetwkjFtDVWWJoXV6GWIs17rlIx47b5BRHTh-Zw-J3Sj1OzhpdEYLEjpkwAtZMmOKNRRjVqBZDHJTlYV8a4E';

export const fetchTracks = async (): Promise<SavedTrack[]> => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: SavedTrack[] };

  return data.items;
};
