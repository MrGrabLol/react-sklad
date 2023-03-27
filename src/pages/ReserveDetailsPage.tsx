import {Outlet, useLoaderData, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import icon from "../assets/logo_new_v2.png";
import {ReserveNavigation} from "../components/ReserveNavigation";
import axios from "axios";
import {IReserve} from "../interfaces/exportedInterfaces";
import {BACKEND_URL} from "../ConstConfig";
import {ModalWindowReserveExtend} from "../components/ModalWindowReserveExtend";
import {ModalWindowReserveCancel} from "../components/ModalWindowReserveCancel";
import {ReserveDetailsProps} from "../components/ReserveDetails";
import useToken from "../hooks/useToken";
import {closeNav, exitHandler, openNav} from "./SkladPage";

//@ts-ignore
export async function reserveIdLoader({params}) {
    if (!localStorage.getItem('token')) {
        return {
            id: 0, mark: '', diameter: '', packing: '', comment: '', location: '', days: 0,
            positions: [], dueDate: '', part: '', weight: 0, creationDate: '', bill: '', customer: ''
        }
    } else {
        const response = await axios.get(BACKEND_URL + '/api/v1/reserve/' + params.id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        const reserve: IReserve = response.data
        return {reserve}
    }
}

export function ReserveDetailsPage() {

    const {setToken} = useToken()
    const {reserve} = useLoaderData() as ReserveDetailsProps
    const navigate = useNavigate()
    const [extendModal, setExtendModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)

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
                <img className='image' src={icon} alt="Ферротрейд" onClick={() => {
                    navigate('/')
                }}/>
                <ReserveNavigation setCancelModal={setCancelModal} setExtendModal={setExtendModal}/>
            </div>
            <div className='mainbar' id='myMainbar'>
                {extendModal && <ModalWindowReserveExtend openModal={setExtendModal} id={reserve.id} status={reserve.status}/>}
                {cancelModal && <ModalWindowReserveCancel openModal={setCancelModal} id={reserve.id} status={reserve.status}/>}
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