"use client"; // 이 지시어를 추가하여 클라이언트 컴포넌트로 설정합니다.

import React, { useEffect, useState } from 'react'

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const passwordKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if(e.key === 'Enter') {
      onLogin(username, password);
    }
  }

  useEffect(()=>{
    console.log('keypress')
  }, [password, username])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={passwordKey}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;