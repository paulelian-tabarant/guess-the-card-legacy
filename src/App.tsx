import { useState } from 'react';
import type { DisplayCard, Rank } from './models/Card';
import { GameService, type GameResult } from './services/GameService';
import { CardButton } from './components/CardButton';

function App() {
  const [gameService] = useState(() => new GameService());
  const [result, setResult] = useState<GameResult | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [secretCard, setSecretCard] = useState<DisplayCard | null>(null);

  const ranks = gameService.getAllRanks();

  const handleCardClick = (rank: Rank) => {
    if (gameWon) return;

    const gameResult = gameService.makeGuess(rank);
    setResult(gameResult);
    setAttempts(attempts + 1);

    if (gameResult === 'gagné !!') {
      setGameWon(true);
      setSecretCard(gameService.revealSecretCard());
    }
  };

  const handleReset = () => {
    gameService.resetGame();
    setResult(null);
    setAttempts(0);
    setGameWon(false);
    setSecretCard(null);
  };

  // Fonction pour obtenir le symbole Unicode selon la couleur
  const getSuitSymbol = (suit: DisplayCard['suit']): string => {
    const symbols = {
      'Coeur': '♥',
      'Carreau': '♦',
      'Trèfle': '♣',
      'Pique': '♠',
    };
    return symbols[suit];
  };

  // Fonction pour obtenir la couleur (rouge ou noir)
  const getSuitColor = (suit: DisplayCard['suit']): string => {
    return suit === 'Coeur' || suit === 'Carreau' ? '#dc143c' : '#2c3e50';
  };

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

          {gameWon && secretCard && (
            <div style={{
              marginTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{
                fontSize: '16px',
                color: '#666',
                fontWeight: '400',
              }}>
                La carte mystère était :
              </div>
              <div style={{
                width: '100px',
                height: '140px',
                padding: '12px',
                border: '2px solid #191919',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  alignSelf: 'flex-start',
                  color: getSuitColor(secretCard.suit),
                }}>
                  {secretCard.rank}
                </div>
                <div style={{
                  fontSize: '48px',
                  lineHeight: '1',
                  color: getSuitColor(secretCard.suit),
                }}>
                  {getSuitSymbol(secretCard.suit)}
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  alignSelf: 'flex-end',
                  transform: 'rotate(180deg)',
                  color: getSuitColor(secretCard.suit),
                }}>
                  {secretCard.rank}
                </div>
              </div>
              <button
                onClick={handleReset}
                style={{
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
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}>
          {ranks.map((rank) => (
            <CardButton
              key={rank}
              rank={rank}
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
