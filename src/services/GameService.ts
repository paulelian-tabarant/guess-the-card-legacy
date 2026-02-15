import type {Card, Rank} from '../models/Card';
import {createDeck, RANKS} from '../models/Card';

export type GameResult = 'plus' | 'moins' | 'gagné !!';

export class GameService {
  private secretCard: Card | null = null;
  private readonly deck: Card[] = [];

  constructor() {
    this.deck = createDeck();

    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const chosenCard = this.deck[randomIndex];

    this.secretCard = chosenCard;
  }
  public makeGuess(guessedRank: Rank): GameResult {
    if (!this.secretCard) {
      throw new Error('Le jeu n\'a pas été initialisé');
    }

    const guessedCardValue = RANKS.find(r => r.rank === guessedRank)?.value;
    if (guessedCardValue === undefined) {
      throw new Error('Rang de carte invalide');
    }

    if (guessedCardValue === this.secretCard.value) {
      return 'gagné !!';
    } else if (guessedCardValue < this.secretCard.value) {
      return 'plus';
    } else {
      return 'moins';
    }
  }

  public resetGame(): void {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const chosenCard = this.deck[randomIndex];

    this.secretCard = chosenCard;
  }

  public getDeck(): Card[] {
    return this.deck;
  }

  public getSecretCard(): Card | null {
    return this.secretCard;
  }
}
