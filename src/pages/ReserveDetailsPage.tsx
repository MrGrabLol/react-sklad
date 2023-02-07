import {Outlet, useLoaderData, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import icon from "../assets/logo_new_v2.png";
import {ReserveNavigation} from "../components/ReserveNavigation";
import axios, {AxiosError} from "axios";
import {IReserve} from "../interfaces/exportedInterfaces";
import {BACKEND_URL} from "../ConstConfig";
import {ModalWindowReserveExtend} from "../components/ModalWindowReserveExtend";
import {ModalWindowReserveCancel} from "../components/ModalWindowReserveCancel";
import {ReserveDetailsProps} from "../components/ReserveDetails";

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
    const {reserve} = useLoaderData() as ReserveDetailsProps
    const navigate = useNavigate()
    const [extendModal, setExtendModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    })

    return (
        <div className='container'>
            <div className='sidebar'>
                <img className='image' src={icon} alt="Ферротрейд" onClick={() => {
                    navigate('/')
                }}/>
                <ReserveNavigation setCancelModal={setCancelModal} setExtendModal={setExtendModal}/>
            </div>
            <div className='mainbar'>
                {extendModal && <ModalWindowReserveExtend openModal={setExtendModal} id={reserve.id}/>}
                {cancelModal && <ModalWindowReserveCancel openModal={setCancelModal} id={reserve.id}/>}
                <Outlet/>
            </div>
        </div>
    )
}