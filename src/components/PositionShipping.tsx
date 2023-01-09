import {useLoaderData} from "react-router-dom";
import React, {useState} from "react";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import {IThirdStepShipping} from "../interfaces/exportedInterfaces";
import {PositionShippingPrint} from "./PositionShippingPrint";
import '../css/PositionShipping.css'

export function PositionShipping() {

    //@ts-ignore
    const {card} = useLoaderData()

    const [customWeight, setCustomWeight] = useState(card.weight)
    const [bill, setBill] = useState('')
    const [customer, setCustomer] = useState('')
    const [error, setError] = useState('')
    const [secondStepDispatch, setSecondStepDispatch] = useState(false)
    const [dispatchResponse, setDispatchResponse] = useState<IThirdStepShipping>({print: [], new: []})


    async function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        if (Number(customWeight) > Number(card.weight)) {
            setError('вес не может быть больше начального')
        } else {
            try {
                const response = await axios.post(BACKEND_URL + '/api/v1/dispatch/confirm', {
                    positions: [
                        {
                            id: card.id,
                            weight: customWeight
                        }
                    ],
                    bill: bill,
                    customer: customer
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                setDispatchResponse(response.data)
                setSecondStepDispatch(true)
            } catch (e: unknown) {
                const error = e as AxiosError
                setError(error.message)
            }
        }
    }

    return (
        <div>
            {(card.status === 'Отгружено' || card.status === 'отгружено') && <h2 style={{marginTop: '50px'}}>Нельзя отгрузить уже отгруженную позицию</h2>}
            {card.status !== 'Отгружено' && card.status !== 'отгружено' &&
                <div className='dispatch-container'>
                    {error && <h2 style={{color: 'red'}}>Ошибка: {error}</h2>}
                    {!secondStepDispatch &&
                        <form className='dispatch-container-form' onSubmit={submitHandler}>
                            <div className='dispatch-input'>
                                <div className='dispatch-input-field'>
                                    <label htmlFor="customer">Покупатель</label>
                                    <input id='customer' type="text"
                                           onChange={(event) => setCustomer(event.target.value)} required
                                           placeholder=' Наименование организации/ФИО/...' value={customer}/>
                                </div>
                                <div className='dispatch-input-field'>
                                    <label htmlFor="bill">Счёт</label>
                                    <input id='bill' type="text" required placeholder=' Номер счёта' value={bill}
                                           onChange={(event) => setBill(event.target.value.replace(/[^1234567890]+/g, ''))}/>
                                </div>
                            </div>
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
                                    <p className='card-item__text-ship'><span className='span-ship'>Вес: </span></p>
                                    <input type="text" value={customWeight}
                                           onChange={(event) => setCustomWeight(event.target.value.replace(/[^.1234567890]+/g, ''))}
                                           required/>
                                </div>
                                <p className='card-item__text-ship'><span
                                    className='span-ship'>Производитель: </span>{card.manufacturer}</p>
                                {card.comment && <p className='card-item__text-ship'><span
                                    className='span-ship'>Комментарий: </span>{card.comment}</p>}
                            </div>
                            <div className='dispatch-btn'>
                                <button type='submit'>Отгрузить</button>
                            </div>
                        </form>
                    }
                    {secondStepDispatch &&
                        <PositionShippingPrint item={dispatchResponse}/>
                    }
                </div>
            }
        </div>
    )
}