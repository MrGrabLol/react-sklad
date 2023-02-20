import '../css/Login.css'
import React, {useState} from "react";
import axios, {AxiosError} from "axios";
import {ErrorMessage} from "../components/ErrorMessage";
import {useNavigate} from 'react-router-dom';
import icon from "../assets/logo_new.png"
import {BACKEND_URL} from "../ConstConfig";
import useToken from "../hooks/useToken";

export function LoginPage() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {setToken} = useToken()
    const navigate = useNavigate();

    const submitHandler = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        try {
            const responseLogin = await axios.post(BACKEND_URL + '/api/v1/auth/login', {
                login,
                password
            })
            setToken(responseLogin.data.accessToken)
            localStorage.setItem('expireTime', responseLogin.data.expireTime)
            const responseWorker = await axios.get(BACKEND_URL + '/api/v1/worker', {
                headers: {
                    Authorization: 'Bearer ' + responseLogin.data.accessToken
                }
            })
            localStorage.setItem('worker', responseWorker.data.name + ' ' + responseWorker.data.lastName)
            localStorage.setItem('roles', responseWorker.data.roles)
            navigate("/")
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <div className='login'>
            {error && <ErrorMessage error={error}/>}
            <form onSubmit={submitHandler} className='login-panel'>
                <img src={icon} alt={'Logo'}/>
                <h1>Авторизация</h1>
                <span className='field'>
                    <p>Логин:</p>
                    <input type="text" value={login} onChange={event => setLogin(event.target.value)}/>
                </span>
                <span className='field'>
                    <p>Пароль:</p>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </span>
                <button type='submit' className='btn-login'>Войти</button>
            </form>
        </div>
    )
}