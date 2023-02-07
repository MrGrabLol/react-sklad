import icon from "../assets/logo_new_v2.png";
import {Navigation} from "../components/Navigation";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useToken from "../hooks/useToken";

export function SkladPage() {

    const {token, setToken} = useToken()
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    })

    const clickHandler = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    // const [opened, setOpened] = useState(true)

    function openNav() {
        document.getElementById("mySidebar")!.style.width = "20%"
        document.getElementById("myMainbar")!.style.width = "80%"
        document.getElementById('btnOpenNav')!.style.opacity = '0'
        document.getElementById('btnOpenNav')!.style.width = '0'
        document.getElementById('btnOpenNav')!.style.cursor = 'default'
    }

    function closeNav() {
        document.getElementById("mySidebar")!.style.width = "0"
        document.getElementById("myMainbar")!.style.width = "100%"
        document.getElementById('btnOpenNav')!.style.opacity = '1'
        document.getElementById('btnOpenNav')!.style.width = '50px'
        document.getElementById('btnOpenNav')!.style.cursor = 'pointer'
    }

    return (
            <div className='container'>
                <div className='sidebar' id='mySidebar'>
                    <div className='a-container'>
                        <a href='javascript:void(0)' className="closebtn" onClick={() => {
                            closeNav()
                        }}>&times;</a>
                    </div>
                    <img className='image' src={icon} alt="Ферротрейд" onClick={() => {navigate('/')}}/>
                    <Navigation/>
                </div>
                <div className='mainbar' id='myMainbar'>
                    <button className='btn-exit' onClick={clickHandler} >Выйти</button>
                    <button className="openbtn" id='btnOpenNav' onClick={() => {
                        openNav()
                    }}>&#9776;</button>
                    <Outlet/>
                </div>
            </div>
    )

}