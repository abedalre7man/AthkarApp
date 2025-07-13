import React, { useEffect, useState } from 'react';
import './AzkarCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { cardsData } from "../cardsData.js";

function AzkarCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const updated = cardsData.map(card => ({
      ...card,
      currentCount: card.count
    }));
    setCards(updated);
  }, []);

  const handleCardClick = (id) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id && card.currentCount > 0
          ? { ...card, currentCount: card.currentCount - 1 }
          : card
      )
    );
  };

  const handleReset = (id) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, currentCount: card.count } : card
      )
    );
  };

  return (
    <div className="cards-container">
      {cards.map(card => (
        <div
          className={`card ${card.colorClass}`}
          key={card.id}
          onClick={() => handleCardClick(card.id)}
        >
          <h3 className="card-title">{card.title}</h3>
          <button
            className="refresh-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleReset(card.id);
            }}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
          <h1>{card.currentCount}</h1>
          <p className="card-total">{card.count}</p>
        </div>
      ))}
    </div>
  );
}

export default AzkarCards;
