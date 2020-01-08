require('dotenv').config();

const twitter = require('twitter');

// https://developer.twitter.com

const config = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const screen_name = '***';
const count = 200;

config.get('statuses/user_timeline', {screen_name: screen_name, count: count}, (error, tweets, response) => {

  if (!error) {
    tweets.forEach((data) => {

      const tweetID = data.id_str;
      config.post(`statuses/destroy/${tweetID}`, (error, tweet, response) => {

        if (!error) {
          console.info(tweet);
        } else {
          console.error(error);
        }

      });
    });
  } else {
    console.error(error);
  }

});
