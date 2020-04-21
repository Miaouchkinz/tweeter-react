$(document).ready(() => { 

// Populates new tweet in tweet feed
const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');

  // Define the header and all it's descendants then append to $tweet
  let $header = $('<header>');
  let $div = $('<div>');
  let $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars);
  let $user = $('<span>').text(tweet.user.name);
  let $tweeterHandle = $('<span>').addClass('handle').text(tweet.user.handle);

  $div.append($avatar)
    .append($user);

  $header.append($div)
    .append($tweeterHandle)
    .appendTo($tweet);
  
  // Define the text area then append to $tweet
  let $tweetTextMessage = $('<p>').text(tweet.content.text)

  $tweetTextMessage.appendTo($tweet);

  // Define the footer and all it's descendants then append to $tweet
  let $footer = $('<footer>');

  let tweetMoment = moment(tweet['created_at']).fromNow();
  let $timestamp = $('<span>').text(tweetMoment);

  let $iconSection = $('<div>');
  let $flagIcon = $('<i>').addClass('flag-icon').addClass('fab fa-font-awesome-flag');
  let $shareIcon = $('<i>').addClass('share-icon').addClass('fas fa-share-alt-square');
  let $heartIcon = $('<i>').addClass('heart-icon').addClass('fas fa-heart');

  $iconSection.append($flagIcon)
    .append($shareIcon)
    .append($heartIcon);

  $footer.append($timestamp)
    .append($iconSection)
    .appendTo($tweet);

  return $tweet;
}

const renderTweets = function(allTweets) {
  let $tweetContainer = $('#tweet-container');
  for (let tweet of allTweets) {
    let newTweet = createTweetElement(tweet);
    $tweetContainer.prepend(newTweet);
  }
}

const insertNewestTweet = function(data) {
  let $tweetContainer = $('#tweet-container');
  let newTweet = createTweetElement(data);
  $tweetContainer.prepend(newTweet);
  $('#tweet-text-box').val(null);
  $('#counter').text(140);
}

$('.create-tweet > form').on('submit', (event) => {
  event.preventDefault();
  // error: textbox empty
  if (!$('#tweet-text-box').val()) {
    $('.error-message').hide(200).text('Your tweet is empty, please try again!').show(200);
    $('.error-section').slideDown();
  // error: charCount > 140
  } else if ($('#counter').hasClass('invalid-char-count')){
    $('.error-message').hide(200).text('Oops! Your tweet is over our max 140 characters count.').show(200);
    $('.error-section').slideDown();
  // valid message
  } else {
    $('.error-section').slideUp();
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
};

loadtweets();

});
