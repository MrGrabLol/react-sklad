import '../css/Login.css'
import React, {useState} from "react";
import axios, {AxiosError} from "axios";
import PropTypes from 'prop-types'
import {ErrorMessage} from "../components/ErrorMessage";

interface LoginPageProps {
    setToken: (item: string) => void
}

export function LoginPage({setToken}: LoginPageProps) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // const submitHandler = async () => {
    //     try {
    //         console.log(login)
    //         console.log(password)
    //         console.log(login)
    //         console.log(1234567899877)
    //         const response = await axios.post<ResponseBody>('http://localhost:8081/api/v1/auth/login', {
    //             login: login,
    //             password: password
    //         })
    //         console.log(login)
    //         console.log(password)
    //         console.log(response)
    //         // doLogin(response.data)
    //     } catch (e: unknown) {
    //         const error = e as AxiosError
    //         setError(error.message)
    //     }
    //     if (!error) {
    //         redirect('/sklad')
    //     }
    // }

    // async function logIn(credentials: { login: string; password: string; }) {
    //     return fetch('http://localhost:8081/api/v1/auth/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     })
    //         .then(data => data.json())
    // }

    const submitHandler = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:8081/api/v1/auth/login', {
                login,
                password
            })
            setToken(response.data.accessToken)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <>
            <div className='login'>
                {error && <ErrorMessage error={error}/>}
                <form onSubmit={submitHandler} className='login-panel'>
                    <h1>Авторизация</h1>
                    <span className='field'>
                    <p>Логин:</p>
                    <input type="text" value={login} onChange={event => setLogin(event.target.value)}/>
                </span>
                    <span className='field'>
                    <p>Пароль:</p>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </span>
                    <br/>
                    <button type='submit' className='btn-login'>Войти</button>
                </form>
            </div>
        </>
    )
}


LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}