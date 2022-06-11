import React from 'react';
import './Tweet.css';

const Tweet = ({ tweet, currentUser, onClick }) => {
  const parsedDate = new Date(tweet.createdAt).toLocaleDateString('ko-kr');

  return (
    <li className="tweet" id={tweet.id}>
      <div className="tweet__profile">
        <img src={tweet.picture} />
      </div>
      <div className="tweet__content">
        <div className="tweet__userInfo">
          <div className="tweet__userInfo--wrapper">
            <span className='tweet__username'>{tweet.username}</span>
            <span className='tweet__createdAt'>{parsedDate}</span>
            {currentUser === tweet.username ?
              <div className='edit_tools'>
                <i className="fa-solid fa-pencil" />
                <i className="fa-regular fa-trash-can" onClick={() => onClick(tweet.id)} />
              </div>
              : null}
          </div>
        </div>
        <div className="tweet__message">
          {tweet.content}
        </div>
      </div>
    </li>
  );
};

export default Tweet;
