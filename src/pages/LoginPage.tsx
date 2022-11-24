import '../css/Login.css'
import {useState} from "react";
import {Login, ResponseBody} from '../interfaces/models'
import axios, {AxiosError, AxiosResponse} from "axios";

interface LoginProps {
    doLogin: (response: ResponseBody) => void
}


export function LoginPage({doLogin}: LoginProps) {
    const [lgn, setLogin] = useState('')
    const [pswrd, setPassword] = useState('')

    const submitHandler = async () => {
        const log: Login = {
            login: lgn,
            password: pswrd
        }
        const response = await axios.post<ResponseBody>('http://localhost:8081/api/v1/auth/login', log)
        doLogin(response.data)
    }

    return (
        <div className='login'>
            <form onSubmit={submitHandler} className='login-panel'>
                <h1>Авторизация</h1>
                <span className='field'>
                    <p>Логин:</p>
                    <input type="text" value={lgn} onChange={event => setLogin(event.target.value)}/>
                </span>
                <span className='field'>
                    <p>Пароль:</p>
                    <input type="text" value={pswrd} onChange={event => setPassword(event.target.value)}/>
                </span>
                <br/>
                <button type='submit' className='btn-login'>Войти</button>
            </form>
        </div>)
}