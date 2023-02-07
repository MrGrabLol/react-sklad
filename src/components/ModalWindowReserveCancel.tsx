import ReactDom from "react-dom";
import {ModalWindowProps} from "./ModalWindowAddStandard";
import axios, {AxiosError} from "axios";
import {useState} from "react";
import {BACKEND_URL} from "../ConstConfig";
import {useNavigate} from "react-router-dom";

export interface ReserveCancelExtendProps {
    id: number,
    openModal: (prop: boolean) => void
}

export function ModalWindowReserveCancel({id, openModal}: ReserveCancelExtendProps) {
    const navigate = useNavigate()
    const portalElement: HTMLElement = document.getElementById('portal')!
    const [error, setError] = useState('')

    async function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        try {
            const response = await axios.delete(BACKEND_URL + '/api/v1/reserve/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (response.status === 200) {
                navigate('/reserve')
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return ReactDom.createPortal(
        <form className='modalWindow' onSubmit={submitHandler}>
            <div className='modalBackground' id='bg' onClick={() => openModal(false)}/>
            <div className='modalContainerReserve' style={{width: '35%'}}>
                <div className='titleCloseBtn'>
                    <button type='button' id='closeBtn' onClick={() => openModal(false)}>X</button>
                </div>
                <div className='titleReserve'>
                    <h1 style={{fontSize: '38px'}}>Отмена резерва</h1>
                    {error && <h2 style={{color: 'red'}}>{error}</h2>}
                </div>
                <div className='body'>
                    <h3>Вы уверены, что хотите <span style={{color: 'red', fontStyle: 'italic'}}>отменить</span> резерв?</h3>
                </div>
                <div className='footer'>
                    <button type='button' id='cancelBtn' onClick={() => openModal(false)}>Назад</button>
                    <button type='submit' id='confirmBtn'>Отменить</button>
                </div>
            </div>
        </form>,
        portalElement
    )
}