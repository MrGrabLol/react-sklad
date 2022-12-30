import '../css/ModalWindow.css'
import ReactDom from 'react-dom'
import {useState} from "react";
import axios from "axios";

interface ModalWindowProps {
    openModal: (prop: boolean) => void
}

export function ModalWindow({openModal}: ModalWindowProps) {
    const [newMark, setNewMark] = useState('')
    const [newStandard, setNewStandard] = useState('')

    const portalElement: HTMLElement = document.getElementById('portal')!

    async function sendRequest() {
        const response = await axios.post('http://localhost:8081/api/v1/standard', {
            mark: newMark,
            standard: newStandard
        }, {
            headers: {
                Authorizatiion: 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    return ReactDom.createPortal(
        <div className='modalWindow'>
            <div className='modalBackground' id='bg' onClick={() => openModal(false)}/>
            <div className='modalContainer' id='container'>
                <div className='titleCloseBtn'>
                    <button id='closeBtn' onClick={() => openModal(false)}> X</button>
                </div>
                <div className='title'>
                    <h1>Добавление стандарта</h1>
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
                    <button id='cancelBtn' onClick={() => openModal(false)}>Отменить</button>
                    <button id='confirmBtn' onClick={sendRequest}>Добавить</button>
                </div>
            </div>
        </div>,
        portalElement
    )
}