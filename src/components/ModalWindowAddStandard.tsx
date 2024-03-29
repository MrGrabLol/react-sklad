import '../css/ModalWindow.css'
import ReactDom from 'react-dom'
import {useState} from "react";
import axios, {AxiosError} from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BACKEND_URL} from "../ConstConfig";

export interface ModalWindowProps {
    openModal: (prop: boolean) => void
}

export function ModalWindowAddStandard({openModal}: ModalWindowProps) {
    const [newMark, setNewMark] = useState('')
    const [newStandard, setNewStandard] = useState('')
    const [error, setError] = useState('')

    const portalElement: HTMLElement = document.getElementById('portal')!

    async function sendRequest(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        setNewMark(newMark.trim())
        setNewStandard(newStandard.trim())
        try {
            const response = await axios.post(BACKEND_URL + '/api/v1/standard', {
                mark: newMark,
                standard: newStandard
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            window.location.reload()
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return ReactDom.createPortal(
        <form className='modalWindow' onSubmit={sendRequest}>
            <div className='modalBackground' id='bg' onClick={() => openModal(false)}/>
            <div className='modalContainer' id='container'>
                <div className='titleCloseBtn'>
                    <button type='button' id='closeBtn' onClick={() => openModal(false)}>X</button>
                </div>
                <div className='title'>
                    <h1>Добавление стандарта</h1>
                    {error && <h3 style={{color: 'red'}}>Ошибка добавления стандарта: {error}</h3>}
                </div>
                <div className='body'>
                    <div className='modalInput'>
                        <label htmlFor="mark">Марка:</label>
                        <input type="text" id='mark' placeholder='Введите марку' value={newMark}
                               onChange={(event) => setNewMark(event.target.value)} required/>
                    </div>
                    <div className='modalInput'>
                        <label htmlFor="gost">ГОСТ:</label>
                        <input type="text" id='gost' placeholder='Введите ГОСТ' value={newStandard}
                               onChange={(event) => setNewStandard(event.target.value)} required/>
                    </div>
                </div>
                <div className='footer'>
                    <button type='button' id='cancelBtn' onClick={() => openModal(false)}>Отменить</button>
                    <button type='submit' id='confirmBtn'>Добавить</button>
                </div>
            </div>
        </form>,
        portalElement
    )
}