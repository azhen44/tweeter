/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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

const createTweetElement =  (tweetData) => {
  const $article = $(`<article>`).addClass("tweet-container");

  //Creates the Header of the Tweet------------------------
  const tweetHeader = $(`<header>`).addClass("tweetHeader")
  const nameAndPic = $(`<div id="nameAndPic">`);
  const avatar = $(`<img class="avatar" src=${tweetData.user.avatars} />`);
  const fullName = $('<span>').addClass('fullName').text(`${tweetData.user.name}`);
  nameAndPic.append(avatar,fullName)
  const handle = $(`<span class="tagName"></span>`).text(`${tweetData.user.handle}`);
  //--------------------------------------------------------

  //Content of tweet
  const content = $('<div>').append($('<p>')).addClass('tweet').text(`${tweetData.content.text}`);

  //Footer of Tweer
  const tweetFooter = $(`<footer>`).addClass('tweetFooter');
  const date = $(`<span>`).text(`${tweetData.created_at}`)
  const icons = $(`<div>`).addClass('icons');
  icons.append(`<i class="fa-solid fa-flag"></i>`, `<i class="fa-solid fa-retweet"></i>`,`<i class="fa-solid fa-heart"></i>`)
  tweetFooter.append(date,icons)



  
  

  let res = $article.append(tweetHeader.append(nameAndPic,handle),content,tweetFooter)
  //console.log(res)
  return res
    
}

const renderTweet = (data) => {
  for (const x of data) {
    console.log(createTweetElement(x))
    $('.tweets-container').append(createTweetElement(x))
  }
}

$(() => {
const $tweet = createTweetElement(tweetData);
renderTweet(data)
// Test / driver code (temporary)

//$('.tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


});