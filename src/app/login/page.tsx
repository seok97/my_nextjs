"use client"
import React from 'react';
import LoginForm from '../../components/LoginForm';

interface LoginResponse {
    "message": string,
    "extensions": {
        "code": number,
        "data": {
            "user_no": string,
            "login_id": string,
            "name": string,
            "password": string,
            "auth_token": string,
            "refresh_token": string,
            "auth": number
        }
    }
}

const apiServerUrl = 'http://localhost:3001/api/'

const loginRequest = async (usernamePassword:{ login_id, password }) => {
  const res = await fetch(apiServerUrl + '/login', {
    method: "POST",
    headers : {
      "Content-Type":"application/json; charset=utf-8"
    },
    body: JSON.stringify(usernamePassword)
  }).then((res=>res.json()))
    .then((res: LoginResponse)=>{
      console.log('username is : ', res.extensions.data.name);
    })
}

const Login: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Logging in with', username, password);
    loginRequest({login_id: username, password})
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;