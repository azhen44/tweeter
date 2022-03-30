$(document).ready(function() {
  $("#tweet-text").on('keyup', function(event) {
    let currentChar = $(this).val().length; // get current char enetered.
    let counter = $(this).siblings("div").children(".counter"); // targets the DOM element for the counter class.


    //updating the current value;
    counter.text(140 - currentChar);

    //Changes color if condition is met.
    if (counter.val() < 0) {
      counter.addClass("redFont")
    } else {
      counter.removeClass("redFont")
    }
  })
});