document.addEventListener('DOMContentLoaded', event => {
});

$(document).ready(function() {
  const limit = 140;
  const textLen = $(this).val().length;
  const charRemain = limit - textLen;
  $('#tweet-text').on('input', function(event) {
    $(this).parentsUntil(".new-tweet")
    if (charRemain) {
      $(this).parentsUntil(".new-tweet")
      .find(".counter")
      .addClass('counterMinus');
    }
    $(this).parentsUntil(".new-tweet")
      .text(charRemain);
  });    
});