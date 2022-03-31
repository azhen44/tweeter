/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement =  (tweetData) => {
  const $article = $(`<article>`).addClass("tweet-container");

  //Creates the Header of the Tweet------------------------
  const tweetHeader = $(`<header>`).addClass("tweetHeader");
  const nameAndPic = $(`<div id="nameAndPic">`);
  const avatar = $(`<img class="avatar" src=${tweetData.user.avatars} />`);
  const fullName = $('<span>').addClass('fullName').text(`${tweetData.user.name}`);
  nameAndPic.append(avatar,fullName);
  const handle = $(`<span class="tagName"></span>`).text(`${tweetData.user.handle}`);
  //--------------------------------------------------------

  //Content of tweet
  const content = $('<div>').append($('<p>')).addClass('tweet').text(`${tweetData.content.text}`);

  //Footer of Tweer
  const tweetFooter = $(`<footer>`).addClass('tweetFooter');
  const formattedDate = timeago.format(tweetData.created_at);
  const date = $(`<span>`).text(formattedDate);
  const icons = $(`<div>`).addClass('icons');
  icons.append(`<i class="fa-solid fa-flag"></i>`, `<i class="fa-solid fa-retweet"></i>`,`<i class="fa-solid fa-heart"></i>`);
  tweetFooter.append(date,icons);

  let res = $article.append(tweetHeader.append(nameAndPic,handle),content,tweetFooter);
  return res;
};

const renderTweet = (data) => {
  for (const x of data) {
    $('.tweets-container').prepend(createTweetElement(x))
  };
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    type: 'GET',
  }).then((data) => {
    renderTweet(data);

  })
} 

$(() => {
  loadTweets();

  // Listening for form Submission --------------------------------------------------
  $("form").on('submit', function (event) {
    event.preventDefault();
    const input = 140 - $(this).children('div').children('.counter').val();

    // Checks amount of Char entered. Outputs an error message if its too long or empty.
    if (input > 140) {
      $('.errorMsg').text('Message too long');
      return;
    } else {
      $('.errorMsg').text('');
    }

    if (input === 0) {
      $('.errorMsg').text('Empty Message');
      return;
    } else {
      $('.errorMsg').text('');
    }

    $.ajax({
      url: '/tweets/',
      type: 'POST',
      data: $('form').serialize()
   
    }).then((data) => {
      $('#tweet-text').val('');
      $('.counter').val('140')
      loadTweets();
      
    })
  })
  //--------------------------------------------------------------------------------
  $('#topButton').hide();
  $(window).scroll( () => {
    if ($(this).scrollTop() > 1000) {
      console.log($(this).scrollTop())
      $('#topButton').show();
    } else {
      $('#topButton').hide();
    }
  });



  $('#topButton').on('click', () => {
    $("html, nav").animate({ scrollTop: "0" });
    $('#tweet-text').focus();
  })

  
});