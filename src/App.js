import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import Sidebar from './Sidebar';
import Tweets from './Pages/Tweets';
import MyPage from './Pages/MyPage';
import About from './Pages/About';
import LogIn from './Pages/LogIn'

import './App.css';

const App = () => {
  let [isLoggedIn, setIsLoggedIn] = useState({ state: false, user: "" });
  console.log(isLoggedIn);
  const { pathname } = useLocation();

  if (isLoggedIn.state && pathname === "/login") {
    return <Navigate to={`../mypage/${isLoggedIn.user}`} />
  }

  return (
    <main>
      <Sidebar currentUser={isLoggedIn.user} />
      <section className="features">
        <Routes>
          <Route path='/' element={<Tweets currentUser={isLoggedIn.user} />} />
          <Route path='/about' element={<About />} />
          <Route path='/mypage/:username' element={<MyPage isLoggedIn={isLoggedIn} />} />
          <Route path='/login' element={<LogIn checkLogIn={setIsLoggedIn} />} />;
        </Routes>
      </section>
    </main>
  );
};


export default App;
