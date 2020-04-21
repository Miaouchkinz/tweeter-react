import React from 'react';
import './Tweet.css';

export const Tweet = (props) => {
  const {
    name,
    handle,
    avatar_url,
    text,
    timestamp } = props

  return (
    <article className="tweet">
      <header>
        <div>
          <img className="avatar" src={avatar_url}/>
          <span>{name}</span>
        </div>
        <span className="handle">{handle}</span>
      </header>

      <p>{text}</p>
      
      <footer>
        <span>{timestamp}</span>
        <div>
          <i className="flag-icon fab fa-font-awesome-flag" aria-hidden="true"></i>
          <i className="share-icon fas fa-share-alt-square" aria-hidden="true"></i>
          <i className="heart-icon fas fa-heart" aria-hidden="true"></i>
        </div>
      </footer>
    </article>
  );
}