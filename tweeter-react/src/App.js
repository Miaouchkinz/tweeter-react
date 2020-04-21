import React, { useState } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Profile } from './components/Profile';
import { TweetForm } from './components/TweetForm';
import { Tweet } from './components/Tweet';

const initialTweetData = [
  {
    name: "Newton",
    handle: "@SirIsaac",
    avatar_url: "https://i.imgur.com/73hZDYK.png",
    text: "If I have seen further it is by standing on the shoulders of giants",
    timestamp: "4 years ago"
  },
  {
    name: "Amy Mansel",
    handle: "@heyitsamy",
    avatar_url: "https://i.imgur.com/73hZDYK.png",
    text: "What do you think of hexagons?",
    timestamp: "15 days ago"
  }
];

function App() {
  const [tweetData, setTweetData] = useState(initialTweetData);

  const tweets = tweetData.map((tweetData, index) => {
    return ( 
      <Tweet
        key={index}
        name={tweetData.name}
        handle={tweetData.handle}
        avatar_url={tweetData.avatar_url}
        text={tweetData.text}
        timestamp={tweetData.timestamp}
      />
    );
  });

const addNewTweet = (text) => {
  const newTweet= {
      name: "Gab Richard",
      handle: "@gab",
      avatar_url: "https://i.imgur.com/73hZDYK.png",
      text,
      timestamp: "5 days ago"
    };
  
  setTweetData([newTweet, ...tweetData]);
};

  return (
    <div className="App">
      <Navigation />
      <Profile />
      <main className="container">
        <TweetForm addNewTweet={addNewTweet}/>
      <section id="tweet-container">
        {tweets}
      </section>
      </main>
    </div>
  );
}

export default App;
