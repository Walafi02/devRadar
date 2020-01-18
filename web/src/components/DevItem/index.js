import React from 'react';

import './style.css';

export default function DevItem({dev}) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt="Walafi Ferreira" />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      {dev.bio && (
        <p>{dev.bio}</p>
      )}
      <a href={`https://github.com/${dev.username_github}`}>Acessar Perfil</a>
    </li>
  );
}
