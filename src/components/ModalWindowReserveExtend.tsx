import {ModalWindowProps} from "./ModalWindowAddStandard";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import ReactDom from "react-dom";
import '../css/ModalWindowReserveExtend.css'
import {ReserveCancelExtendProps} from "./ModalWindowReserveCancel";

export function ModalWindowReserveExtend({openModal, id}: ReserveCancelExtendProps) {
    const navigate = useNavigate()
    const portalElement: HTMLElement = document.getElementById('portal')!
    const [error, setError] = useState<string>('')
    const [days, setDays] = useState<number>(7)

    async function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        if (days <= 0) {
            setError('Введите валидное количество дней')
        } else {
            try {
                const response = await axios.post(BACKEND_URL + '/api/v1/reserve/' + id, {
                    days: days
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                if (response.status === 200) {
                    window.location.reload()
                }
            } catch (e: unknown) {
                const error = e as AxiosError
                setError(error.message)
            }
        }
    }

    return ReactDom.createPortal(
        <form className='modalWindow' onSubmit={submitHandler}>
            <div className='modalBackground' id='bg' onClick={() => openModal(false)}/>
            <div className='modalContainerReserve' style={{width: '30%'}}>
                <div className='titleCloseBtn'>
                    <button type='button' id='closeBtn' onClick={() => openModal(false)}>X</button>
                </div>
                <div className='titleReserve'>
                    <h1 style={{fontSize: '38px'}}>Продление резерва</h1>
                    {error && <h2 style={{color: 'red'}}>{error}</h2>}
                </div>
                <div className='body'>
                    <div className='reserve-input-container extend-margin'>
                        <div className='modalInputReserve'>
                            <label htmlFor="extend" style={{fontSize: '30px'}}>
                                Продлить на: <span style={{color: 'gray', fontStyle: 'italic'}}>дней</span>
                            </label>
                            <div className='reserve-input-container'>
                                <input type="text" className='extend-input' required value={days}
                                       onChange={(event) => setDays(Number(event.target.value.replace(/[^1234567890]+/g, '')))}/>
                                <button type='button' className='extend-button' onClick={() => setDays(days + 1)}>+</button>
                                <button type='button' className='extend-button' onClick={() => {
                                    if (days <= 1) {
                                        return
                                    } else {
                                        setDays(days - 1)
                                    }
                                }}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <button type='button' id='cancelBtn' onClick={() => openModal(false)}>Назад</button>
                    <button type='submit' id='confirmBtn'>Продлить</button>
                </div>
            </div>
        </form>,
        portalElement
    )
}