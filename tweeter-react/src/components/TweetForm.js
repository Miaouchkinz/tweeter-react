import React, { useState } from 'react';
import './TweetForm.css';

export const TweetForm = ({ addNewTweet }) => {
  const [tweetText, setTweetText] = useState("");
  const tweetRemainingLength = 140 - tweetText.length;
  const spanStyle = {
    color: tweetRemainingLength >= 0 ? "black" : "red"
  };

  const submitTweet = e => {
    e.preventDefault();
    if (tweetRemainingLength >=0 && tweetRemainingLength < 140) {
      addNewTweet(tweetText);
      setTweetText("");
    }
  };

  return (
    <section className="create-tweet ">
      <section className="error-section hide">
        <div>
          <i className="fas fa-exclamation-triangle"></i>
          <p className="error-message"></p>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
      </section>
      <form onSubmit={submitTweet} action="/tweets" method="POST">
        <textarea 
          id="tweet-text-box"
          name="text"
          placeholder="What are you humming about?"
          value={tweetText}
          onChange={e => setTweetText(e.target.value)}
        >
        </textarea>
        <div>
          <input className="button" type="submit" value="Tweet"/>
          <span id="counter" style={spanStyle}>{140 - tweetText.length}</span>
        </div>
      </form>
    </section>
  );
};