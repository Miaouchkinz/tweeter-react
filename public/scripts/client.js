/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//     },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

$(document).ready(() => { 

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');

  // Define the header and all it's descendants then append to $tweet
  let $header = $('<header>');
  let $div = $('<div>');
  let $avatar = $('<img>').addClass('avatar').text(tweet.user.avatars);
  let $user = $('<span>').text(tweet.user.name);
  let $tweeterHandle = $('<span>').addClass('handle').text(tweet.user.handle);

  $div
      .append($avatar)
      .append($user);

  $header
        .append($div)
        .append($tweeterHandle)
        .appendTo($tweet);
  
// Define the text area then append to $tweet
  let $tweetTextMessage = $('<p>').text(tweet.content.text)

  $tweetTextMessage
        .appendTo($tweet);

// Define the footer and all it's descendants then append to $tweet
  let $footer = $('<footer>');
  let $timestamp = $('<span>').text(tweet['created_at']);
  
  let $iconSection = $('<div>');
  let $flagIcon = $('<img>').addClass('flag-icon');
  let $shareIcon = $('<img>').addClass('share-icon');
  let $heartIcon = $('<img>').addClass('heart-icon');

  $iconSection
        .append($flagIcon)
        .append($shareIcon)
        .append($heartIcon);

  $footer
        .append($timestamp)
        .append($iconSection)
        .appendTo($tweet);

  return $tweet;
}

const renderTweets = function(allTweets) {
  let $tweetContainer = $('#tweet-container');
  for (let eachTweet of allTweets) {
    let tweet = createTweetElement(eachTweet);
    $tweetContainer.prepend(tweet);
  }
}

const insertNewestTweet = function() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:8080/tweets'
  }).done(data => {
    let $tweetContainer = $('#tweet-container');
    const newTweet = createTweetElement(data[data.length - 1]);
    $tweetContainer.prepend(newTweet);
  }).done($('#tweet-text-box').val(null));
}

$('.create-tweet > form').on('submit', (event) => {
  event.preventDefault();
  if (!$('#tweet-text-box').val()) {
    alert('Your tweet is empty, please try again!');
  } else if ($('#counter').hasClass('invalid-char-count')){
    alert('Oops! Your tweet is over our max 140 characters count.');
  } else {
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: $('form').serialize()
    })
    .done(data => {
      insertNewestTweet(data)
    });
  }
});

const loadtweets = function() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:8080/tweets'
  })
  .done(renderTweets);
  // .fail(handleTweetLoadErrors);
};

loadtweets();

});
