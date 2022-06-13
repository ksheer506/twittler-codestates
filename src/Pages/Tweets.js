// TODO : useState를 react로 부터 import 합니다.
import React, { useState, useEffect } from 'react';
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


const Tweets = ({ currentUser, Tweets, callbacks, userList, children }) => {
  const { onTweet, onFilter } = callbacks;
  const [newTweet, setNewTweet] = useState({ content: "" });


  const handleChangeMsg = (e) => {
    setNewTweet({ content: e.target.value });
  };
  const handleCreate = (e) => {
    const tweet = new Twittler(currentUser, newTweet.content);
    onTweet(tweet);
  };


  return (
    <>
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
              <button className='tweetForm__submitButton' value="Tweet" onClick={handleCreate}>Tweet</button>
            </div>
          </div>
        </div>
      </div>
      <div className="tweet__selectUser">
        <span>유저 필터링</span>
        <Filter onSelect={onFilter} userList={userList} />
      </div>
      <ul className="tweets">
        {children}
      </ul>
    </>
  );
};

export default Tweets;
