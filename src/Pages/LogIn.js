import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'

import Modal from '../Components/Modal';
import './LogIn.css';

const LogIn = ({ checkLogIn }) => {
  const [idPW, setIdPW] = useState({ id: "", password: "" });
  const navigate = useNavigate();

  const goToMyPage = (e) => {
    checkLogIn({ state: true, user: idPW.id });
    return <Navigate to="../mypage" />  // FIXME: App에 두면 되는데 여기에 두면 왜 안 되지?
  }

  const input = (e, type) => {
    if (type === "ID") {
      setIdPW({ ...idPW, id: e.target.value });
      return
    }
    setIdPW({ ...idPW, password: e.target.value });
  }

  const submitLogin = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:1000/twittler/login'
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idPW),
      credentials: "include"
    }

    const serverReq = await fetch(url, option);
    const result = await serverReq.json();
    if (result.state === "success") {
      
      checkLogIn({ state: true, user: result.user });
      navigate(`../mypage/${result.user}`)
    }
  }

  return (
    <div className='login'>
      <Modal>
        <div className='login_wrapper'>
          <form onSubmit={submitLogin}>
            <div>
              <span>유저명</span>
              <input value={idPW.id} onChange={(e) => input(e, "ID")} />
            </div>
            <div>
              <span>비밀번호</span>
              <input type="password" value={idPW.password} onChange={(e) => input(e, "PASSWORD")} />
            </div>
            <button className='login_btn' type="submit">로그인</button>
          </form>
          <button className='signin_btn'>회원가입</button>
        </div>
      </Modal>
    </div>
  )
}

export default LogIn;