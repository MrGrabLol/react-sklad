import icon from "../assets/logo_new_v2.png";
import {Navigation} from "../components/Navigation";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useToken from "../hooks/useToken";
import {ModalWindowAddUser} from "../components/ModalWindowAddUser";

export function openNav() {
    document.getElementById("mySidebar")!.style.width = "20%"
    document.getElementById("myMainbar")!.style.width = "80%"
    document.getElementById('btnOpenNav')!.style.opacity = '0'
    document.getElementById('btnOpenNav')!.style.width = '0'
    document.getElementById('btnOpenNav')!.style.cursor = 'default'
}

export function closeNav() {
    document.getElementById("mySidebar")!.style.width = "0"
    document.getElementById("myMainbar")!.style.width = "100%"
    document.getElementById('btnOpenNav')!.style.opacity = '1'
    document.getElementById('btnOpenNav')!.style.width = '50px'
    document.getElementById('btnOpenNav')!.style.cursor = 'pointer'
}

export const exitHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('worker')
    localStorage.removeItem('roles')
    localStorage.removeItem('expireTime')
    localStorage.removeItem('location')
}

export function SkladPage() {

    const {setToken} = useToken()
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('token') || Number(localStorage.getItem('expireTime')!) * 1000 < Date.now()) {
            exitHandler()
            navigate('/login')
        }
    })

    return (
            <div className='sklad-container'>
                <div className='sidebar' id='mySidebar'>
                    <div className='a-container'>
                        <a href='javascript:void(0)' className="closebtn" onClick={() => {
                            closeNav()
                        }}>&#8592;</a>
                    </div>
                    <img className='image' src={icon} alt="Ферротрейд" onClick={() => {navigate('/')}}/>
                    <Navigation/>
                </div>
                <div className='mainbar' id='myMainbar'>
                    {modal && <ModalWindowAddUser openModal={setModal}/>}
                    <button className='btn-exit' onClick={() => {
                        setToken('')
                        exitHandler()
                    }}>Выйти</button>
                    {
                        localStorage.getItem('roles')?.includes('ADMIN') &&
                            <button className='btn-admin' onClick={() => setModal(true)}>
                                Добавить пользователя
                            </button>
                    }
                    <button className="openbtn" id='btnOpenNav' onClick={() => {
                        openNav()
                    }}>&#9776;</button>
                    <Outlet/>
                </div>
            </div>
    )

}