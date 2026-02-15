import { useState, useEffect } from 'react';
import type { Card } from './models/Card';
import { GameService, type GameResult } from './services/GameService';
import { CardButton } from './components/CardButton';
import { RANKS } from './models/Card';

function App() {
  const [gameService] = useState(() => new GameService());
  const [deck, setDeck] = useState<Card[]>([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    setDeck(gameService.getDeck());
  }, [gameService]);

  const handleCardClick = (card: Card) => {
    if (gameWon) return;

    const gameResult = gameService.makeGuess(card);
    setResult(gameResult);
    setAttempts(attempts + 1);

    if (gameResult === 'gagné !!') {
      setGameWon(true);
    }
  };

  const handleReset = () => {
    gameService.resetGame();
    setResult(null);
    setAttempts(0);
    setGameWon(false);
  };

  // Prendre seulement la première carte de chaque rang (une seule carte par valeur)
  const uniqueCards = RANKS.map(({ rank }) => {
    return deck.find((card) => card.rank === rank)!;
  }).filter(Boolean);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Devine la Carte</h1>

      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
      }}>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>
          Tentatives : <strong>{attempts}</strong>
        </p>
        {result && (
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '10px 0',
            color: result === 'gagné !!' ? '#27ae60' : '#3498db',
          }}>
            {result}
          </p>
        )}
        {gameWon && (
          <button
            onClick={handleReset}
            style={{
              marginTop: '15px',
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Nouvelle partie
          </button>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        {uniqueCards.map((card) => (
          <CardButton
            key={`${card.suit}-${card.rank}`}
            card={card}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
