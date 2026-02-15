export type Suit = 'Coeur' | 'Carreau' | 'Trèfle' | 'Pique';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

export const RANKS: { rank: Rank; value: number }[] = [
  { rank: '2', value: 1 },
  { rank: '3', value: 2 },
  { rank: '4', value: 3 },
  { rank: '5', value: 4 },
  { rank: '6', value: 5 },
  { rank: '7', value: 6 },
  { rank: '8', value: 7 },
  { rank: '9', value: 8 },
  { rank: '10', value: 9 },
  { rank: 'Valet', value: 10 },
  { rank: 'Dame', value: 11 },
  { rank: 'Roi', value: 12 },
  { rank: 'As', value: 13 },
];

export const SUITS: Suit[] = ['Coeur', 'Carreau', 'Trèfle', 'Pique'];

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of SUITS) {
    for (const { rank, value } of RANKS) {
      deck.push({ suit, rank, value });
    }
  }

  return deck;
}
