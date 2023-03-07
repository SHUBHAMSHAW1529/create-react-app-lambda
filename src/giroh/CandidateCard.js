import React from 'react';
import './CandidateCard.css'

const CandidateCard = ({ name, email, phone }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="card">
      <div className="image">{initials}</div>
      <div className="info">
        <h2>{name}</h2>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  );
};

export default CandidateCard;