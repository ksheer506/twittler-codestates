import React from 'react';
import { Link } from 'react-router-dom'

const Sidebar = ({ currentUser }) => {
  const myPage = currentUser ? `/mypage/${currentUser}` : "/login";
  return (
    <section className="sidebar">
      <Link to="/"><i className="far fa-comment-dots"></i></Link>
      <Link to="/about"><i className="far fa-question-circle"></i></Link>
      <Link to={myPage}><i className="far fa-user"></i></Link>
    </section>
  );
};

export default Sidebar;
