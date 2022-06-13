import React from 'react';
import { useParams } from 'react-router-dom'

import Tweet from '../Components/Tweet';
import './MyPage.css';
import dummyTweets from '../static/dummyData';


const MyPage = ({ isLoggedIn }) => {
  const { username } = useParams();
  const filteredTweets = dummyTweets.filter((tweet) => tweet.username === username);

  return (
    <section className="myInfo">
      <div className="myInfo__container">
        <div className="myInfo__wrapper">
          <div className="myInfo__profile">
            <img src={filteredTweets[0]?.picture} alt="유저 사진" />
          </div>
          <div className="myInfo__detail">
            <p className="myInfo__detailName">
              {username}
            </p>
            <p>28 팔로워 100 팔로잉</p>
          </div>
        </div>
      </div>
      <ul className="tweets__mypage">
        {filteredTweets?.map((tweet) => <Tweet tweet={tweet} key={tweet.id} />)}
      </ul>
    </section>
  )
};

export default MyPage;
