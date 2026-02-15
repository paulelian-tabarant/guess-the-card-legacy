import type { Card } from '../models/Card';

interface CardButtonProps {
  card: Card;
  onClick: (card: Card) => void;
}

export function CardButton({ card, onClick }: CardButtonProps) {
  return (
    <button
      onClick={() => onClick(card)}
      style={{
        width: '80px',
        height: '110px',
        margin: '5px',
        padding: '10px',
        border: '2px solid #34495e',
        borderRadius: '8px',
        backgroundColor: '#ecf0f1',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2c3e50',
        transition: 'transform 0.1s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div style={{ fontSize: '20px', marginBottom: '5px' }}>{card.rank}</div>
      <div style={{ fontSize: '24px' }}>♣</div>
    </button>
  );
}
