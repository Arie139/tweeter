/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// display errors 
const displayError = err_msg => {
$("form").find("#error").text(err_msg).show().slideDown("fast");
$("form").find("#error").text(err_msg).show().slideUp(6000);
};

//render tweet
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets").prepend($tweet);
  }
};

//create tweet dynamically to html, while making sure text is safe
const createTweetElement = function (userTweetObj) {
  const { content, user, created_at } = userTweetObj;
  const { text } = content;
  const time = timeago.format(created_at);
  const tweetContainer = $(`
      <article>
        <header>
          <span class="username"><img class="img" src="${
            user.avatars
          }">${user.name}</span>
          <span class="userid">${user.handle}</span>
        </header>
        <p class="tweet-text">${$("<p>").text(text).html()}</p>
        <footer>
          <span>${time}</span>
          <span><i class="fas fa-flag"></i>&nbsp;&nbsp;<i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
        </footer>
      </article>
    `);
  return tweetContainer;
};

//load tweets
const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then((tweetsHTML) => {
    $("#tweets").empty();
    renderTweets(tweetsHTML);
  });
  $("#error").empty();
  $("#error").hide();
  $(".tweets").hide();
};

loadTweets();

//create new tweet from textarea
const addTweet = function (event) {
  const $tweetText = $(event.target.text).serialize();
  $.post("/tweets", $tweetText).then(() => {
    $("#tweet-text").val("");
    loadTweets();
  });
};

//post tweet while checking that error requirements are not met, if met posts error message
$(document).ready(function () {
  $("#post-tweet").submit((event) => {
    event.preventDefault();
    
    // if content is more than 14 characters     
    if ($(this).find("textarea").val().length > 140) {
      const error_msg = "You cannot exceed more than 140 characters";       
      return displayError(error_msg);
    }     
    // if content is empty     
    if ($(this).find("textarea").val().length < 1) {
      const error_msg = "You cannot post an empty tweet.";       return displayError(error_msg);
    }

    addTweet(event);
    $(this).find(".counter").text(140);
  });

});
