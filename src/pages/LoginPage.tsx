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
    const {token, setToken} = useToken()
    const navigate = useNavigate();

    const submitHandler = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:8081/api/v1/auth/login', {
                login,
                password
            })
            setToken(response.data.accessToken)
            navigate("/sklad")
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