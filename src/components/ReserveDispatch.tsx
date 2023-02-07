import {useLoaderData} from "react-router-dom";
import {IReserve} from "../interfaces/exportedInterfaces";
import {ReserveDetailsProps} from "./ReserveDetails";
import {CardView} from "./CardView";
import '../css/ReserveDispatch.css'

export function ReserveDispatch() {
    const {reserve} = useLoaderData() as ReserveDetailsProps

    return (
        <div className='dispatch-reserve-container'>
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
            <CardView cards={reserve.positions}/>
            <div className='dispatch-reserve-button-container'>
                <button>Отгрузить</button>
            </div>
        </div>
    )
}