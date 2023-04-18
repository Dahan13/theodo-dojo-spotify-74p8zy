import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQAaYtfq-gjrRgBMobrA0Xz1ZC9mPut_OhI95ASQlpR-3EYqoCxnDGOhH9b1HMmGg78XeVelacYAoJM8UG8ohq0UzluyKAP2sp3IGdvsomjXaAtLuqCMg4FWPQ8i_Ik_CEQcvGumvvRmDkiME_S5L7ONr4QihPBhe5W_ma4C2nJ2h5llRQtDmdHRgsC39Yeb7kVNtlX8sm1yXKw4jux-yOK58iJrwIPqexUl2phP81gIbhSjKWiTTs-XI19O-yyp482XTJvMMFjp-Tzfd3LlPN2f4LXmFQRwCm9KjPiuLrihPg7eazOX4oD87sDAI04SQgvAgaOX1KTuaOqDMy6pZ7m0ykwR9bUpPi5Dsf9E4fkBv9c';

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
