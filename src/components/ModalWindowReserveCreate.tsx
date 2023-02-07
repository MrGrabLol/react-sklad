import {useState} from "react";
import axios, {Axios, AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import ReactDom from "react-dom";
import {ModalWindowProps} from "./ModalWindowAddStandard";
import '../css/ModalWindowReserveCreate.css'

export function ModalWindowReserveCreate({openModal}: ModalWindowProps) {

    const portalElement: HTMLElement = document.getElementById('portal')!
    const [error, setError] = useState('')
    // const [location, setLocation] = useState('sol')

    const [reserveWeight, setReserveWeight] = useState('')
    const [reserveBill, setReserveBill] = useState('')
    const [reserveMark, setReserveMark] = useState('')
    const [reserveDiameter, setReserveDiameter] = useState('')
    const [reservePart, setReservePart] = useState('')
    const [reservePacking, setReservePacking] = useState('')
    const [reserveCustomer, setReserveCustomer] = useState('')
    const [reserveComment, setReserveComment] = useState('')
    const [reserveLocation, setReserveLocation] = useState('Солнечногорск')
    const [reserveDays, setReserveDays] = useState('')

    async function sendRequest(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        try {
            const response = await axios.post(BACKEND_URL + '/api/v1/reserve', {
                mark: reserveMark,
                diameter: Number(reserveDiameter),
                packing: reservePacking,
                part: reservePart,
                weight: Number(reserveWeight),
                customer: reserveCustomer,
                bill: reserveBill,
                comment: reserveComment,
                location: reserveLocation,
                days: Number(reserveDays)
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

    return ReactDom.createPortal(
        <form className='modalWindow' onSubmit={sendRequest}>
            <div className='modalBackground' id='bg' onClick={() => openModal(false)}/>
            <div className='modalContainerReserve'>
                <div className='titleCloseBtn'>
                    <button type='button' id='closeBtn' onClick={() => openModal(false)}>X</button>
                </div>
                <div className='titleReserve'>
                    <h1>Добавление резерва</h1>
                    {error && <h3 style={{color: 'red'}}>Ошибка добавления резерва: {error}</h3>}
                </div>
                <div className='body'>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserve'>
                            <label htmlFor="mark" className='reserve-label'>Марка</label>
                            <input type="text" id='mark' required onChange={(event) => setReserveMark(event.target.value)}/>
                        </div>
                        <div className='modalInputReserve'>
                            <label htmlFor="packing" className='reserve-label'>Упаковка</label>
                            <input type="text" id='packing' required onChange={(event) => setReservePacking(event.target.value)}/>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserveSmall'>
                            <label htmlFor="weight" className='reserve-label'>Вес</label>
                            <input type="text" id='weight' required onChange={(event) => setReserveWeight(event.target.value)}/>
                        </div>
                        <div className='modalInputReserveSmall'>
                            <label htmlFor="diameter" className='reserve-label'>Диаметр</label>
                            <input type="text" id='diameter' required onChange={(event) => setReserveDiameter(event.target.value)}/>
                        </div>
                        <div className='modalInputReserveSmall'>
                            <label htmlFor="part" className='reserve-label'>Партия</label>
                            <input type="text" id='part' onChange={(event) => setReservePart(event.target.value)}/>
                        </div>
                        <div className='modalInputReserveSmall'>
                            <label htmlFor="days" className='reserve-label'>Сколько дней</label>
                            <input type="text" id='days' required onChange={(event) => setReserveDays(event.target.value)}/>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserve'>
                            <label htmlFor="customer" className='reserve-label'>Покупатель</label>
                            <input type="text" id='customer' required onChange={(event) => setReserveCustomer(event.target.value)}/>
                        </div>
                        <div className='modalInputReserve'>
                            <label htmlFor="bill" className='reserve-label'>Счёт</label>
                            <input type="text" id='bill' required onChange={(event) => setReserveBill(event.target.value)}/>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserveLocation'>
                            <label htmlFor="location" className='reserve-label'>Локация</label>
                            <div className='triple-switch-container'>
                                <div className='triple-switch' id='location' style={{marginTop: '8px'}}>
                                    <span id='span-one' className='item-notclicked' onClick={() => {
                                        setReserveLocation('Белорецк')
                                        const element1 = document.getElementById('span-one')!
                                        const element2 = document.getElementById('span-two')!
                                        const element3 = document.getElementById('span-three')!
                                        element1.classList.add('item-clicked')
                                        element2.classList.remove('item-clicked')
                                        element3.classList.remove('item-clicked')
                                    }}><label>Белорецк</label></span>
                                    <span id='span-two' className='item-notclicked item-clicked' onClick={() => {
                                        setReserveLocation('Солнечногорск')
                                        const element1 = document.getElementById('span-one')!
                                        const element2 = document.getElementById('span-two')!
                                        const element3 = document.getElementById('span-three')!
                                        element2.classList.add('item-clicked')
                                        element1.classList.remove('item-clicked')
                                        element3.classList.remove('item-clicked')
                                    }}><label>Солнечногорск</label></span>
                                    <span id='span-three' className='item-notclicked' onClick={() => {
                                        setReserveLocation('Производство')
                                        const element1 = document.getElementById('span-one')!
                                        const element2 = document.getElementById('span-two')!
                                        const element3 = document.getElementById('span-three')!
                                        element3.classList.add('item-clicked')
                                        element2.classList.remove('item-clicked')
                                        element1.classList.remove('item-clicked')
                                    }}><label>Производство</label></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserveComment'>
                            <label htmlFor="comment" className='reserve-label'>Комментарий</label>
                            <textarea id="comment" cols={60} rows={8} onChange={(event) => setReserveComment(event.target.value)}/>
                        </div>
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