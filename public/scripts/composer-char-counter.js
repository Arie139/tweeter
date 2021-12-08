document.addEventListener('DOMContentLoaded', event => {
});

$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    const limit = 140;
    const textLen = $(this).val().length;
    const charRemain = limit - textLen;
    const counter = $(this).closest('form').find('.counter');
    if (charRemain < 0){
    counter.addClass('overCharCount');
    }else {
    counter.removeClass('overCharCount');
    }
  counter.text(charRemain);
  })
});