// TODO : useState를 react로 부터 import 합니다.
import React, { useState } from 'react';
import Footer from '../Footer';
import Tweet from '../Components/Tweet';
import './Tweets.css';
import Filter from '../Components/Filter'
import dummyTweets from '../static/dummyData';

const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (Number(max) - Number(min) + 2));
};

const idGenerator = (function () {
  let id = dummyTweets.length;

  return function () {
    return ++id;
  }
}());

class Twittler {
  constructor(username, content) {
    this.username = username
    this.content = content
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.picture = `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`
    this.id = idGenerator();
  }
}

const userList = (arr) => {
  const uniqueUsers = arr.reduce((acc, curr) => {
    if (!acc[curr.username]) {
      acc[curr.username] = 1;
      return acc;
    }
    acc[curr.username] += 1;

    return acc;
  }, {})

  return Object.keys(uniqueUsers);
};


const Tweets = ({ currentUser }) => {
  const [newTweet, setNewTweet] = useState({ content: "" });
  const [Tweets, setTweets] = useState(dummyTweets);
  const [filterTweet, setFilterTweet] = useState(dummyTweets);

  const handleButtonClick = () => {
    const tweet = new Twittler(currentUser, newTweet.content);
console.log(tweet);
    setTweets([tweet, ...Tweets]);
    setFilterTweet([tweet, ...Tweets]);
  };

  const handleChangeMsg = (e) => {
    setNewTweet({ content: e.target.value });
  };

  const handleFiltering = (e) => {
    const filteredTweets = Tweets.filter((tweet) => {
      if (e.target.value === "") {  // 필터링 값이 없을 때(전체 표시)
        return true;
      }
      return tweet.username === e.target.value;
    });

    setFilterTweet(filteredTweets);
  };

  const deleteTweet = (tweetId) => {
    const result = Tweets.filter((tweet) => tweet.id !== tweetId);

    setTweets(result);
    setFilterTweet(result);
  }
 
  return (
    <React.Fragment>
      <div className="tweetForm__container">
        <div className="tweetForm__wrapper">
          <div className="tweetForm__profile">
            <img src="https://randomuser.me/api/portraits/men/98.jpg" />
          </div>
          <div className="tweetForm__inputContainer">
            <div className="tweetForm__inputWrapper">
              <div className="tweetForm__input">
                <div className='current_UserName'>{currentUser || "로그인 해주세요."}</div>
                <textarea className='tweetForm__input--message' onChange={handleChangeMsg}></textarea>
              </div>
              <div className="tweetForm__count" role="status">
                <span className="tweetForm__count__text">
                  {`total: ${Tweets.length}`}
                </span>
              </div>
            </div>
            <div className="tweetForm__submit">
              <button className='tweetForm__submitButton' value="Tweet" onClick={handleButtonClick}>Tweet</button>
            </div>
          </div>
        </div>
      </div>
      <div className="tweet__selectUser">
        <span>유저 필터링</span>
        <Filter onSelect={handleFiltering} userList={userList(Tweets)} />
      </div>
      <ul className="tweets">
        {filterTweet.map((tweet) => (<Tweet tweet={tweet} currentUser={currentUser} onClick={deleteTweet} key={tweet.id} />))}
      </ul>
    </React.Fragment>
  );
};

export default Tweets;
