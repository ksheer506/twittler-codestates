import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import Sidebar from './Sidebar';
import Tweets from './Pages/Tweets';
import Tweet from './Components/Tweet';
import MyPage from './Pages/MyPage';
import About from './Pages/About';
import LogIn from './Pages/LogIn';

import './App.css';

const userList = (arr) => {
  if (arr.length < 1) return [];

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


const App = () => {
  let [isLoggedIn, setIsLoggedIn] = useState({ state: false, user: "" });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [filterTweet, setFilterTweet] = useState([]);

  useEffect(() => {
    if (!dataLoaded) {
      (async function () {
        const dataReq = await fetch("http://localhost:1000/twittler/posts");
        const data = await dataReq.json();

        setTweets(data);
        setFilterTweet(data)
        setDataLoaded(true);
      }());
    }
  }, [])

  /* 메시지 추가 */
  const handleCreating = (tweet) => {
    setTweets([tweet, ...tweets]);
    setFilterTweet([tweet, ...tweets]);
  };
  
  /* 메시지 필터링 */
  const handleFiltering = (e) => {
    const filteredTweets = tweets.filter((tweet) => {
      if (e.target.value === "") {  // 필터링 값이 없을 때(전체 표시)
        return true;
      }
      return tweet.username === e.target.value;
    });

    setFilterTweet(filteredTweets);
  };

  /* 메시지 삭제 */
  const deleteTweet = (tweetId) => {
    const result = tweets.filter((tweet) => tweet.id !== tweetId);

    setTweets(result);
    setFilterTweet(result);
  }
  const callbacks = {
    onTweet: handleCreating,
    onFilter: handleFiltering,
  }

  return (
    <main>
      <Sidebar currentUser={isLoggedIn.user} />
      <section className="features">
        <Routes>
          <Route path='/' element={
            <Tweets
              currentUser={isLoggedIn.user}
              Tweets={filterTweet}
              dataLoaded={dataLoaded}
              userList={userList(tweets)}
              callbacks={callbacks}>
              {
                dataLoaded ?
                  (filterTweet.map((tweet) => (<Tweet tweet={tweet} currentUser={isLoggedIn.user} onClick={deleteTweet} key={tweet.id} />)))
                  : (<div>데이터를 불러오는 중입니다...</div>)
              }
            </Tweets>} />
          <Route path='/about' element={<About />} />
          <Route path='/mypage/:username' element={<MyPage isLoggedIn={isLoggedIn} />} />
          <Route path='/login' element={<LogIn checkLogIn={setIsLoggedIn} />} />;
        </Routes>
      </section >
    </main >
  );
};


export default App;
