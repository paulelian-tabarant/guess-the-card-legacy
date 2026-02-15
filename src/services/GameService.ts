import type { Card } from '../models/Card';
import { createDeck } from '../models/Card';

export type GameResult = 'plus' | 'moins' | 'gagné !!';

export class GameService {
  private secretCard: Card | null = null;
  private readonly deck: Card[] = [];

  constructor() {
    this.deck = createDeck();
    this.initializeGame();
  }

  private initializeGame(): void {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    this.secretCard = this.deck[randomIndex];
  }

  public makeGuess(guessedCard: Card): GameResult {
    if (!this.secretCard) {
      throw new Error('Le jeu n\'a pas été initialisé');
    }

    if (guessedCard.value === this.secretCard.value) {
      return 'gagné !!';
    } else if (guessedCard.value < this.secretCard.value) {
      return 'plus';
    } else {
      return 'moins';
    }
  }

  public resetGame(): void {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    this.secretCard = this.deck[randomIndex];
  }

  public getDeck(): Card[] {
    return this.deck;
  }
}
