import React, {useState} from "react";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import ReactDom from "react-dom";
import {ModalWindowProps} from "./ModalWindowAddStandard";
import '../css/ModalWindowReserveCreate.css'
import {useRegisterAutocomplete} from "../hooks/useRegisterAutocomplete";

export function ModalWindowReserveCreate({openModal}: ModalWindowProps) {

    const portalElement: HTMLElement = document.getElementById('portal')!
    const [requestError, setRequestError] = useState('')
    const [fieldError, setFieldError] = useState('')

    const [reserveWeight, setReserveWeight] = useState('')
    const [reserveBill, setReserveBill] = useState('')
    const [reserveMark, setReserveMark] = useState('')
    const [reserveDiameter, setReserveDiameter] = useState('')
    const [reservePart, setReservePart] = useState('')
    const [reservePacking, setReservePacking] = useState('')
    const [reserveCustomer, setReserveCustomer] = useState('')
    const [reserveComment, setReserveComment] = useState('')
    const [reserveLocation, setReserveLocation] = useState('Солнечногорск')
    const [reserveDays, setReserveDays] = useState<number>(7)

    const {reserveMarks, packs, error} = useRegisterAutocomplete()
    const [markAutocomplete, setMarkAutocomplete] = useState(false)
    const [packingAutocomplete, setPackingAutocomplete] = useState(false)
    const [ulFocus, setUlFocus] = useState(false)

    async function sendRequest(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setRequestError('')
        setFieldError('')
        if (Number(reserveDays) < 1 || Number(reserveDiameter) <= 0 || Number(reserveWeight) <= 0) {
            setFieldError('Введите корректные данные в поля с весом/диаметром/днями')
        } else {
            try {
                const response = await axios.post(BACKEND_URL + '/api/v1/reserve', {
                    mark: reserveMark.trim(),
                    diameter: Number(reserveDiameter),
                    packing: reservePacking.trim(),
                    part: reservePart.trim(),
                    weight: Number(reserveWeight),
                    customer: reserveCustomer.trim(),
                    bill: reserveBill.trim(),
                    comment: reserveComment.trim(),
                    location: reserveLocation,
                    days: reserveDays
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                if (response.status === 200) {
                    window.location.reload()
                } else if (response.status === 400) {
                    setRequestError(response.data.message)
                }
            } catch (e: unknown) {
                const error = e as AxiosError
                setRequestError(error.message)
            }
        }
    }

    function clickHandler(event: string, setState: (prop: string) => void, setFlag: (prop: boolean) => void) {
        setState(event)
        setFlag(false)
    }

    function showAutocomplete(input: string, items: string[], setState: (prop: string) => void,
                              setItemAutocomplete: (prop: boolean) => void,
                              ulClass: string, liClass: string, emClass: string) {
        if (items.filter((item) => item.toLowerCase().includes(input.toLowerCase())).length) {
            return (
                <ul className={ulClass}>
                    {items.filter((item) => item.toLowerCase().includes(input.toLowerCase()))
                        .map((item, index) =>
                            <li className={liClass} key={index} onMouseOver={() => setUlFocus(true)}
                                onMouseOut={() => setUlFocus(false)}
                                onClick={event => {
                                    clickHandler(event.currentTarget.innerText, setState, setItemAutocomplete)
                                    setUlFocus(false)
                                }}>{item}</li>
                        )}
                </ul>
            )
        } else {
            return (
                <div className={emClass}>
                    <em>Нет элементов</em>
                </div>
            )
        }
    }

    return ReactDom.createPortal(
        <form className='modalWindow' onSubmit={sendRequest}>
            <div className='modalBackground' id='bg' onClick={() => openModal(false)}/>
            <div className='modalContainerReserve adding-reserve'>
                <div className='titleCloseBtn'>
                    <button type='button' id='closeBtn' onClick={() => openModal(false)}>X</button>
                </div>
                <div className='titleReserve'>
                    <h1>Добавление резерва</h1>
                    {requestError && <h3 style={{color: 'red'}}>Ошибка добавления резерва: {requestError}</h3>}
                    {fieldError && <h3 style={{color: 'red'}}>{fieldError}</h3>}
                </div>
                <div className='body'>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserve'>
                            <label htmlFor="mark" className='reserve-label'>Марка</label>
                            <input type="text" id='mark' value={reserveMark} required onChange={(event) => setReserveMark(event.target.value)}
                                   onFocus={() => setMarkAutocomplete(true)} onBlur={() => {
                                if (ulFocus) {
                                    return
                                } else {
                                    setMarkAutocomplete(false)
                                }
                            }}/>
                            {reserveMark !== '' && markAutocomplete && !error && showAutocomplete(reserveMark, reserveMarks, setReserveMark, setMarkAutocomplete,
                                'suggestions-reg-reserve', 'suggestion-hoverable-reg-reserve', 'no-suggestions-reg-reserve')}
                        </div>
                        <div className='modalInputReserve'>
                            <label htmlFor="packing" className='reserve-label'>Упаковка</label>
                            <input type="text" id='packing' value={reservePacking} required onChange={(event) => setReservePacking(event.target.value)}
                                   onFocus={() => setPackingAutocomplete(true)} onBlur={() => {
                                if (ulFocus) {
                                    return
                                } else {
                                    setPackingAutocomplete(false)
                                }
                            }}/>
                            {reservePacking !== '' && packingAutocomplete && !error && showAutocomplete(reservePacking, packs, setReservePacking, setPackingAutocomplete,
                                'suggestions-reg-reserve', 'suggestion-hoverable-reg-reserve', 'no-suggestions-reg-reserve')}
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserveSmall'>
                            <label htmlFor="weight" className='reserve-label'>Вес</label>
                            <input type="text" id='weight' value={reserveWeight} required onChange={(event) => setReserveWeight(event.target.value.replace(/[^.1234567890]+/g, ''))}/>
                        </div>
                        <div className='modalInputReserveSmall'>
                            <label htmlFor="diameter" className='reserve-label'>Диаметр</label>
                            <input type="text" id='diameter' value={reserveDiameter} required onChange={(event) => setReserveDiameter(event.target.value.replace(/[^.1234567890]+/g, ''))}/>
                        </div>
                        <div className='modalInputReserveSmall'>
                            <label htmlFor="part" className='reserve-label'>Партия</label>
                            <input type="text" id='part' value={reservePart} onChange={(event) => setReservePart(event.target.value)}/>
                        </div>
                        <div className='modalInputReserveSmall'>
                            <label htmlFor="days" id='except-input-label' className='reserve-label'>Сколько дней</label>
                            <div className='days-container' id='days'>
                                <input type="text" id='except-input' value={reserveDays} required onChange={(event) => setReserveDays(Number(event.target.value.replace(/[^1234567890]+/g, '')))}/>
                                <button type='button' onClick={() => {
                                    setReserveDays(reserveDays + 1)
                                }}>+</button>
                                <button type='button' onClick={() => {
                                    if (reserveDays > 1) {
                                        setReserveDays(reserveDays - 1)
                                    } else {
                                        return
                                    }
                                }}>-</button>
                            </div>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserve'>
                            <label htmlFor="customer" className='reserve-label'>Покупатель</label>
                            <input type="text" id='customer' value={reserveCustomer} required onChange={(event) => setReserveCustomer(event.target.value)}/>
                        </div>
                        <div className='modalInputReserve'>
                            <label htmlFor="bill" className='reserve-label'>Счёт</label>
                            <input type="text" id='bill' value={reserveBill} required onChange={(event) => setReserveBill(event.target.value)}/>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserveLocation'>
                            <label htmlFor="location" className='reserve-label'>Локация</label>
                            <div className='triple-switch-container'>
                                <div className='triple-switch' id='location' style={{marginTop: '8px'}}>
                                    <span id='span-one' className='item-notclicked' onClick={() => {
                                        setReserveLocation('Белорецк(Склад)')
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
                                        setReserveLocation('Белорецк(Производство)')
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
                            <textarea id="comment" value={reserveComment} cols={60} rows={8} onChange={(event) => setReserveComment(event.target.value)}/>
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