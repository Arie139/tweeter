/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = tweets => {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets').prepend($tweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(userTweetObj) {
    const time = timeago.format(userTweetObj.created_at);;
    const tweetContainer = $(`
      <article>
        <header>
          <span class="username"><img class="img" src="${userTweetObj.user.avatars}">${userTweetObj.user.name}</span>
          <span class="userid">${userTweetObj.user.handle}</span>
        </header>
        <p class="tweet-text">${escape(userTweetObj.content.text)}</p>
        <footer>
          <span>${time}</span>
          <span><i class="fas fa-flag"></i>&nbsp;&nbsp;<i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
        </footer>
      </article>
    `);
    return tweetContainer;
  };
  
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(tweetsHTML => {
      $('#tweets').empty();
      renderTweets(tweetsHTML);
    });
    $('#error').empty();
    $('#error').hide();
    $('.tweets').hide();
  };

  loadTweets();

  $("#post-tweet").submit(event => {
    const charCount = $(event.target.text).serialize().length - 5;
    $('#error').empty();
    if ( $('#error').is(":hidden") ) {
      $('#error').empty();
    } else {
      $('#error').hide();
    }
    event.preventDefault();
    if (errorMsg(charCount)) {
      return $('#error').append(errorMsg(charCount)).slideDown("fast");
    } else {
      $('#error').hide();
    }
    addTweet(event);
    $(this).find(".counter").text(140);
  });

  const addTweet = function(event) {
    const $tweetText = $(event.target.text).serialize();
    $.post('/tweets', $tweetText).then(() => {
      $('#tweet-text').val('');
      loadTweets();
    })
  };
  
  const errorMsg = function(num) {
    let message = "";
    if (!num)  {
      message = "Please enter a tweet"
    } else if (num > 140) {
      message = "Your tweet is too long, maximum characters is 140";
    }
    if (message)  {
      return `<span><i class="fas fa-exclamation-triangle"></i></span><span>${message}</span><span><i class="fas fa-exclamation-triangle"></i></span>`;
    }
  };
});