import {useLoaderData, useNavigate} from "react-router-dom";
import {IReserve} from "../interfaces/exportedInterfaces";
import {ReserveDetailsProps} from "./ReserveDetails";
import {CardView} from "./CardView";
import '../css/ReserveDispatch.css'
import axios, {AxiosError} from "axios";
import {useState} from "react";
import {BACKEND_URL} from "../ConstConfig";
import {Card} from "./Card";

export function ReserveDispatch() {

    const [error, setError] = useState<string>('')

    const {reserve} = useLoaderData() as ReserveDetailsProps
    const navigate = useNavigate()

    async function dispatchReserve() {
        setError('')
        try {
            const response = await axios.post(BACKEND_URL + '/api/v1/reserve/' + reserve.id + '/dispatch', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (response.status === 200) {
                navigate('/reserve')
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError('Ошибка отправки запроса: ' + error.message)
        }
    }

    return (
        <div>
            {reserve.status === 'Создан'  &&
                <h2 className='reserve-header-warning' style={{color: 'rgb(253, 185, 0)'}}>Перед отгрузкой необходимо подтвердить резерв</h2>
            }
            {(reserve.status === 'Отменен' || reserve.status === 'Истек срок') &&
                <h2 className='reserve-header-warning' style={{color: 'red'}}>Нельзя отгрузить резерв который был отменен / у которого истек срок</h2>
            }
            {reserve.status === 'Отгружен' &&
                <h2 className='reserve-header-warning' style={{color: 'rgb(253, 185, 0)'}}>Резерв уже отгружен</h2>
            }
            {reserve.status === 'Подтвержден' &&
                <div className='dispatch-reserve-container'>
                    {error && <h2 style={{color: 'red'}}>{error}</h2>}
                    <div className='bill-customer-field'>
                        <div className='bill-customer-field-column'>
                            <p><span>Покупатель: </span>{reserve.customer}</p>
                        </div>
                        <div className='bill-customer-field-column'>
                            <p><span>Счёт: </span>{reserve.bill}</p>
                        </div>
                        <div className='bill-customer-field-column'>
                            <p><span>Общий вес: </span>{reserve.weight}</p>
                        </div>
                    </div>
                    <h1>Позиции:</h1>
                    <div className='card-container-reg'>
                        {reserve.positions.map((pos, index) => <Card card={pos} key={index}/>)}
                    </div>
                    <div className='dispatch-reserve-button-container'>
                        <button onClick={dispatchReserve}>Отгрузить</button>
                    </div>
                </div>
            }
        </div>
    )
}