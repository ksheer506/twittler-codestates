import React from 'react';
import { Link } from 'react-router-dom'

const Sidebar = ({ currentUser }) => {
  const myPage = currentUser ? `/mypage/${currentUser}` : "/login";
  
  return (
    <section className="sidebar">
      <Link to="/"><i className="far fa-comment-dots" /></Link>
      <Link to="/about"><i className="far fa-question-circle" /></Link>
      <Link to={myPage}><i className="far fa-user" /></Link>
    </section>
  );
};

export default Sidebar;
