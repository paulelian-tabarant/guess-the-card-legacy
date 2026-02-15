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
        width: '85px',
        height: '120px',
        margin: '4px',
        padding: '10px',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
        e.currentTarget.style.borderColor = '#d0d0d0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.borderColor = '#e5e5e5';
      }}
    >
      <div style={{
        fontSize: '15px',
        fontWeight: '500',
        alignSelf: 'flex-start',
        color: '#191919',
      }}>
        {card.rank}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4px',
        fontSize: '20px',
        lineHeight: '1',
      }}>
        <span style={{ color: '#dc143c' }}>♥</span>
        <span style={{ color: '#dc143c' }}>♦</span>
        <span style={{ color: '#2c3e50' }}>♣</span>
        <span style={{ color: '#2c3e50' }}>♠</span>
      </div>
      <div style={{
        fontSize: '15px',
        fontWeight: '500',
        alignSelf: 'flex-end',
        transform: 'rotate(180deg)',
        color: '#191919',
      }}>
        {card.rank}
      </div>
    </button>
  );
}
