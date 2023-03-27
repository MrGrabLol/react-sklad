import {Outlet, useNavigate} from "react-router-dom";
import icon from "../assets/logo_new_v2.png";
import {PositionNavigation} from "../components/PositionNavigation";
import '../css/CardIdView.css'
import React, {useEffect} from "react";
import useToken from "../hooks/useToken";
import {closeNav, exitHandler, openNav} from "./SkladPage";

// @ts-ignore
export function PositionPage() {

    const {setToken} = useToken()
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token') || Number(localStorage.getItem('expireTime')!) * 1000 < Date.now()) {
            exitHandler()
            navigate('/login')
        }
    })

    return (
        <div className='container'>
            <div className='sidebar' id='mySidebar'>
                <div className='a-container'>
                    <a href='javascript:void(0)' className="closebtn" onClick={() => {
                        closeNav()
                    }}>&#8592;</a>
                </div>
                <img className='image' src={icon} alt="Ферротрейд" onClick={() => {navigate('/')}}/>
                <PositionNavigation/>
            </div>
            <div className='mainbar' id='myMainbar'>
                <button className='btn-exit' onClick={() => {
                    setToken('')
                    exitHandler()
                }}>Выйти</button>
                <button className="openbtn" id='btnOpenNav' onClick={() => {
                    openNav()
                }}>&#9776;</button>
                <Outlet/>
            </div>
        </div>
    )
}