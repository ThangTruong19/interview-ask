import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import './LoginCss.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SERVER_URL from "../api/axiosClient";

import SetCookie from "../cookie/setCookie";
import GetCookie from "../cookie/getCookie";
import RemoveCookie from "../cookie/removeCookie";

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const navigate = useNavigate();

    const handleChangeUserName = (userName) => {
        setUserName(userName);
    }

    const handleChangePassword = (password) => {
        setPassword(password);
    }

    const handleSubmit = e => {
        SERVER_URL.get(`/getToken?username=${userName}&password=${password}`)
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                    RemoveCookie('usrin');
                    SetCookie('usrin', JSON.stringify(res.data));
                    setAccessToken(res.data.token);
                    navigate("/");
                }
                else {
                    alert('Login failed!');
                }
            })
            .catch(error => {
                //console.log(error);
                alert('Login failed!');
            });
        // console.log(userName, password);
        // navigate("/");
    }

    return (
        <div>
            <div className="form-login">
                <h3>Sign In</h3>

                <div className="mb-3">
                    <label>User name</label>
                    <input type="username"
                        className="form-control"
                        placeholder="Enter ID"
                        value={userName}
                        onChange={e => handleChangeUserName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => handleChangePassword(e.target.value)} />
                </div>

                {/* <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div> */}

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
                {/* <p className="forgot-password text-right">
                    <a href="/sign-up">Sign up</a>
                </p> */}
            </div>
        </div>
    )
}

export default Login;