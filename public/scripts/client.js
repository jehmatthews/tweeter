/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function to re-encode unsafe text to safe encoded text
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// html code being implemented with jquery
// string literals used to bring in user information along with 'escape' function for safety
const createTweetElement = function(data) {
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

// this function will render the tweets made and prepend newest tweets, putting them at the top of list
const renderTweets = function(data) {
  $('#tweets-container').empty();
  for (let tweet of data) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  };
};

// where tweets are received with a ajax GET request. receive the tweet from json file, then it renders
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
  event.preventDefault(); // allows event to continue propogation

  $('.error-message').slideDown(400).text(''); // where errors are handled in tweet form

  if (!$(this).children().find('textarea').val()) {
    return $('.error-message').text('⚠ Please enter text ⚠').slideDown();
  }
  if ($(this).children().find('textarea').val().length > 140) {
    return $('.error-message').text('⚠ Exceeded maximum characters ⚠').slideDown();
  }
  
  $.ajax('/tweets', { // tweets are posted with this ajax post request to database
    method: 'POST',
    data: $(this).serialize()
  })
    .then(function(tweet) {
      loadTweets(); // uses this function to load or if error, catches it below
    })
    .catch((err) => {
      console.log('Error', err);
    });

  $(this).children().find('textarea').val(''); // resets text area by clearing the form after submission
  $('.counter').text(140); // resets counter to 140 after submission
};

loadTweets();

// function where tweet form submission occurs
$(document).ready(function (){
  console.log('Document ready');

  $('form.submit-tweet').on('submit', submitTweet);

});