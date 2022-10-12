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

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(data) {
  console.log(data);
  let $tweet = $(`
  <article class="tweets-container">
    
  <div class="tweet-header">
    <img src="${escape(data.user.avatars)}" width="50" height="50">
    <p class="name">${escape(data.user.name)}</p>
    <p class="username">${escape(data.user.handle)}</p>
  </div>
  
  <p class="tweet-text">${escape(data.content.text)}</p>
  <div class="tweet-footer">
    <p class="tweet-date">${escape(timeago.format(data.created_at))}</p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-retweet"></i>
      <i class="fa-sharp fa-solid fa-heart"></i>
    </div>
  </div>
  </article>
  `);
  return $tweet;
};


const renderTweets = function(data) {
  for (let tweet of data) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  };
};

const loadTweets = function() {
  $.ajax("/tweets", {method: 'GET'})
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch((err) => {
      console.log('Error', err);
    });
};

const submitTweet = function(event) {
  event.preventDefault();

  $('.error-message').slideUp(400).text('');

  if (!$(this).children().find('textarea').val()) {
    return $('.error-message').text('⚠ Please enter text ⚠').slideDown();
  }
  if ($(this).children().find('textarea').val().length > 140) {
    return $('.error-message').text('⚠ Exceeded maximum characters ⚠').slideDown();
  }
  
  $.ajax('/tweets', {
    method: 'POST',
    data: $(this).serialize()
  })
    .then(function(tweet) {
      loadTweets();
    })
    .catch((err) => {
      console.log('Error', err);
    });

  $(this).children().find('textarea').val('');
  $('.counter').text(140);
};

loadTweets();

$(document).ready(function (){
  console.log('Document ready');

  $('form.submit-tweet').on('submit', submitTweet);

});