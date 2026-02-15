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

    const gameResult = gameService.makeGuess(card.rank);
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

  // Fonction pour obtenir le style selon le résultat
  const getResultDisplay = (result: GameResult) => {
    if (result === 'gagné !!') {
      return { text: 'Gagné', color: '#191919' };
    } else if (result === 'plus') {
      return { text: 'Plus haut', color: '#191919' };
    } else {
      return { text: 'Plus bas', color: '#191919' };
    }
  };

  const resultDisplay = result ? getResultDisplay(result) : null;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fafaf9',
      padding: '48px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      <div style={{
        maxWidth: '840px',
        margin: '0 auto',
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#191919',
          fontSize: '32px',
          fontWeight: '400',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          Devine la Carte
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '15px',
          fontWeight: '400',
          marginBottom: '48px',
        }}>
          Trouvez la carte mystère
        </p>

        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: 'transparent',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '15px', color: '#666', fontWeight: '400' }}>Tentatives </span>
            <strong style={{ fontSize: '15px', color: '#191919', fontWeight: '500' }}>{attempts}</strong>
          </div>

          {resultDisplay && (
            <div style={{
              fontSize: '24px',
              fontWeight: '400',
              margin: '24px 0',
              padding: '16px',
              color: resultDisplay.color,
              backgroundColor: '#fff',
              borderRadius: '12px',
              animation: 'fadeIn 0.2s ease-out',
              border: '1px solid #e5e5e5',
              maxWidth: '300px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {resultDisplay.text}
            </div>
          )}

          {gameWon && (
            <button
              onClick={handleReset}
              style={{
                marginTop: '24px',
                padding: '12px 24px',
                fontSize: '15px',
                backgroundColor: '#191919',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#191919';
              }}
            >
              Nouvelle partie
            </button>
          )}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
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

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
