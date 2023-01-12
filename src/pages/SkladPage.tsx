import icon from "../assets/logo_new_v2.png";
import {Navigation} from "../components/Navigation";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import useToken from "../hooks/useToken";

export function SkladPage() {

    const {token, setToken} = useToken()
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    })

    const clickHandler = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    return (
            <div className='container'>
                <div className='sidebar'>
                    <img className='image' src={icon} alt="Ферротрейд"/>
                    <Navigation/>
                </div>
                <div className='mainbar'>
                    <button className='btn-exit' onClick={clickHandler} >Выйти</button>
                    <Outlet/>
                </div>
            </div>
    )

}