import {useLoaderData} from "react-router-dom";
import React, {useState} from "react";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import {IPositionsResponse, IShipping, IThirdStepShipping} from "../interfaces/exportedInterfaces";
import '../css/PositionShipping.css'
import {PackView} from "./PackView";
import {ThirdStepShipping} from "./ThirdStepShipping";

export function PositionShipping() {

    //@ts-ignore
    const {card} = useLoaderData()

    const [customWeight, setCustomWeight] = useState(card.weight)
    const [bill, setBill] = useState<string>('')
    const [customer, setCustomer] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [secondStepDispatch, setSecondStepDispatch] = useState<boolean>(false)
    const [secondStepFullDispatch, setSecondStepFullDispatch] = useState<boolean>(false)
    const [dispatchResponse, setDispatchResponse] = useState<IThirdStepShipping>({print: [], new: []})
    const [workStatus, setWorkStatus] = useState<boolean>(false)

    function setArray() {
        let array: IShipping[] = []
        if (card.type === 'Поддон' || card.type === 'поддон') {
            card.positions.forEach((el: IPositionsResponse) => {
                array = [...array, {id: el.id, weight: Number(el.weight)}]
            })
        } else {
            array = [{id: card.id, weight: Number(card.weight)}]
        }
        return array
    }

    const [idWeightArray] = useState<IShipping[]>(setArray)
    const [initialArray] = useState<IShipping[]>(setArray)

    if (card.type === 'Позиция' || card.type === 'позиция') {
        idWeightArray[0].weight = Number(customWeight)
    }

    async function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        if (card.type === 'Поддон' || card.type === 'поддон') {
            if (idWeightArray.filter(element => element.weight === 0 || element.weight > initialArray.find(el => el.id === element.id)!.weight).length > 0) {
                setError('введите корректные значения в поля веса')
            } else {
                try {
                    const response = await axios.post(BACKEND_URL + '/api/v1/dispatch/confirm', {
                        positions: idWeightArray,
                        bill: bill,
                        customer: customer
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    if (response.data.print.length === 0 && response.data.new.length === 0) {
                        setSecondStepFullDispatch(true)
                    } else {
                        setDispatchResponse(response.data)
                        setSecondStepDispatch(true)
                    }
                } catch (e: unknown) {
                    const error = e as AxiosError
                    setError(error.message)
                }
            }
        } else {
            if (Number(customWeight) > Number(card.weight)) {
                setError('вес не может быть больше начального')
            } else if (Number(customWeight) === 0) {
                setError('вес не может равняться 0')
            } else {
                try {
                    const response = await axios.post(BACKEND_URL + '/api/v1/dispatch/confirm', {
                        positions: idWeightArray,
                        bill: bill,
                        customer: customer
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    if (response.data.print.length === 0 && response.data.new.length === 0) {
                        setSecondStepFullDispatch(true)
                    } else {
                        setDispatchResponse(response.data)
                        setSecondStepDispatch(true)
                    }
                } catch (e: unknown) {
                    const error = e as AxiosError
                    setError(error.message)
                }
            }
        }
    }

    return (
        <div>
            {(card.status === 'Отгружено' || card.status === 'отгружено') &&
                <h2 style={{marginTop: '50px'}}>Позиция уже отгружена</h2>}
            {(card.status === 'Резерв' || card.status === 'резерв') &&
                <h2 style={{marginTop: '50px', color: 'rgb(253, 185, 0)'}}>Позиция находится в резерве</h2>}
            {card.status !== 'Отгружено' && card.status !== 'отгружено' && card.status !== 'Резерв' && card.status !== 'резерв' &&
                <div className='dispatch-container'>
                    {secondStepFullDispatch && <h2 style={{color: 'green'}}>Позиция успешно отгружена</h2>}
                    {error && <h2 style={{color: 'red'}}>Ошибка: {error}</h2>}
                    {!secondStepDispatch &&
                        <form className='dispatch-container-form' onSubmit={submitHandler} style={{marginTop: '50px'}}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <div className='double-switch' style={{width: '50%'}}>
                                    <span id='double-switch-one' className='double-switch-span item-clicked' onClick={() => {
                                        document.getElementById('double-switch-one')!.classList.add('item-clicked')
                                        document.getElementById('double-switch-two')!.classList.remove('item-clicked')
                                        setWorkStatus(false)
                                        setCustomer('')
                                    }}>Отгрузка</span>
                                    <span id='double-switch-two' className='double-switch-span' onClick={() => {
                                        document.getElementById('double-switch-one')!.classList.remove('item-clicked')
                                        document.getElementById('double-switch-two')!.classList.add('item-clicked')
                                        setWorkStatus(true)
                                        setCustomer('В работу')
                                    }}>В работу</span>
                                </div>
                            </div>
                            <div className='dispatch-input'>
                                <div className='dispatch-input-field'>
                                    <label htmlFor="customer">Покупатель</label>
                                    <input id='customer' type="text"
                                           onChange={(event) => setCustomer(event.target.value)} required
                                           placeholder=' Наименование организации/ФИО/...' value={customer}
                                           disabled={secondStepFullDispatch || workStatus}/>
                                </div>
                                <div className='dispatch-input-field'>
                                    <label htmlFor="bill">Счёт</label>
                                    <input id='bill' type="text" required placeholder=' Номер счёта'
                                           value={bill}
                                           onChange={(event) => setBill(event.target.value.replace(/[^1234567890]+/g, ''))}
                                           disabled={secondStepFullDispatch || workStatus}/>
                                </div>
                            </div>
                            {(card.type === 'Поддон' || card.type === 'поддон') &&
                                <div>
                                    <div className='shipping-view-container'>
                                        <PackView pack={card} idWeightArray={idWeightArray} disabledField={secondStepFullDispatch}/>
                                    </div>
                                    <div className='dispatch-btn' style={{marginBottom: '50px'}}>
                                        <button type='submit' disabled={secondStepFullDispatch}>Отгрузить</button>
                                    </div>
                                </div>

                            }
                            {(card.type === 'Позиция' || card.type === 'позиция') &&
                                <div>
                                    <div className='card-item-ship'>
                                        <p className='card-item__title-ship'>{card.mark}</p>
                                        {card.standards.length > 0 && <p className='card-item__text-ship'><span
                                            className='span-ship'>Стандарты: </span>{card.standards.join(',')}</p>}
                                        <p className='card-item__text-ship'><span
                                            className='span-ship'>Диаметр: </span>{card.diameter}</p>
                                        <p className='card-item__text-ship'><span
                                            className='span-ship'>Упаковка: </span>{card.packing}</p>
                                        <p className='card-item__text-ship'><span
                                            className='span-ship'>Партия: </span>{card.part}</p>
                                        <p className='card-item__text-ship'><span
                                            className='span-ship'>Плавка: </span>{card.plav}</p>
                                        <div className='input-block-step-two'>
                                            <p className='card-item__text-ship'><span className='span-ship'>Вес: </span>
                                            </p>
                                            <input type="text" value={customWeight}
                                                   onChange={(event) => setCustomWeight(event.target.value.replace(/[^.1234567890]+/g, ''))}
                                                   required disabled={secondStepFullDispatch}/>
                                        </div>
                                        <p className='card-item__text-ship'><span
                                            className='span-ship'>Производитель: </span>{card.manufacturer}</p>
                                        {card.comment && <p className='card-item__text-ship'><span
                                            className='span-ship'>Комментарий: </span>{card.comment}</p>}
                                    </div>
                                    <div className='dispatch-btn'>
                                        <button type='submit' disabled={secondStepFullDispatch}>Отгрузить</button>
                                    </div>
                                </div>
                            }
                        </form>
                    }
                    {secondStepDispatch &&
                        <ThirdStepShipping object={dispatchResponse}/>
                    }
                </div>
            }
        </div>
    )
}