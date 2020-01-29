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

// This function can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container. 
// In order to do this, the renderTweets will need to leverage the createTweetElement function you wrote earlier by passing the
// tweet object to it, then using the returned jQuery object by appending it to the #tweets-container section.

$(document).ready(() => { 

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');

  // Define the header and all it's descendants then append to $tweet
  let $header = $('<header>');
  let $div = $('<div>');
  let $avatar = $('<img>').addClass('avatar').text(tweetData.user.avatars);
  let $user = $('<span>').text(tweetData.user.name);
  let $tweeterHandle = $('<span>').addClass('handle').text(tweetData.user.handle);

  $div
      .append($avatar)
      .append($user);

  $header
        .append($div)
        .append($tweeterHandle)
        .appendTo($tweet);
  
// Define the text area then append to $tweet
  let $tweetTextMessage = $('<p>').text(tweetData.content.text)

  $tweetTextMessage
        .appendTo($tweet);

// Define the footer and all it's descendants then append to $tweet
  let $footer = $('<footer>');
  let $timestamp = $('<span>').text(tweetData['created_at']);
  
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
  // loops through tweets
  // allTweets.forEach(tweet => {
  //   let tweetHTML = createTweetElement(tweet);
  //   $tweetContainer.append(tweetHTML);
  // })
  for (let eachTweet of allTweets) {
    let tweet = createTweetElement(eachTweet);
    $tweetContainer.append(tweet);
  }
}

// Test / driver code (temporary)
// const $tweet = createTweetElement(tweetData);
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

$('.create-tweet > form').on('submit', (event) => {
  event.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/tweets/',
    data: $('form').serialize()
  })
});

// Will need to pass a callback that has renderTweets inside of it being called
// Will need to change the for loop to work for an array
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