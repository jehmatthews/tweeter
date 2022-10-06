/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}



const createTweetElement = function(tweet) {
  let $tweet = $(`
    <article class="tweets-container">
  
    <div class="tweet-header">
      <img src="${tweet.user.avatars}" width="50" height="50">
      <p class="name">${tweet.user.name}</p>
      <p class="username">${tweet.user.handle}</p>
    </div>

    <p class="tweet-text"${tweet.content.text}</p>

    <div class="tweet-footer">
      <p class="tweet-date">${tweet.created_at}</p>
        <div class="flags">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-sharp fa-solid fa-heart"></i>
        </div>
    </div>
  </article>
  `);
  console.log($tweet);
  return $tweet;
};

const $tweet = createTweetElement(tweetData);

const renderTweets = function(tweets) {
  // $('#tweets-container').empty();
  for (let tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  };
};

$(() => {
  renderTweets(data);
});


