import React from 'react';
import './CandidateCard.css'

const CandidateCard = ({ candidateData, onCandidateCardClick }) => {
  const name = candidateData.Name;
  const email = candidateData.Email;
  const phone = candidateData.Contact;

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
  
  const handleClick = () => {
    onCandidateCardClick(candidateData);
  };
  return (
    <div className="card" onClick={handleClick}>
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