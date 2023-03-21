import {IReserve} from "../interfaces/exportedInterfaces";
import {Link} from "react-router-dom";
import React, {useState} from "react";

interface ReserveProps {
    reserve: IReserve
}

export function Reserve({reserve}: ReserveProps) {

    const [style] = useState(() => {
        if (reserve.status === 'Отменен') {
            return '3px solid red'
        } else if (reserve.status === 'Отгружен') {
            return '3px solid green'
        } else if (reserve.status === 'Истек срок') {
            return '3px solid gray'
        } else if (reserve.status === 'Создан') {
            return '3px solid rgb(253, 185, 0)'
        } else {
            return '3px solid #3b4da3'
        }
    })

    return (
        <Link className="card-item" style={{border: style}} target="_blank" to={ '/reserve/' + reserve.id + '/info' }>
            <div>
                <p className="card-item__title reserve-header">{reserve.mark}</p>
                <p className="card-item__text reserve-font"><span className='reserve-header'>Диаметр:</span> {reserve.diameter}</p>
                <p className="card-item__text reserve-font"><span className='reserve-header'>Упаковка:</span> {reserve.packing}</p>
                <p className="card-item__text reserve-font"><span className='reserve-header'>Партия:</span> {reserve.part}</p>
                <p className="card-item__text reserve-font"><span className='reserve-header'>Вес:</span> {reserve.weight}</p>
                {reserve.comment && <p className="card-item__text reserve-font"><span className='reserve-header'>Комментарий:</span> {reserve.comment}</p>}
                <p className="card-item__text reserve-font"><span className='reserve-header'>Покупатель:</span> {reserve.customer}</p>
                <p className="card-item__text reserve-font"><span className='reserve-header'>Счёт:</span> {reserve.bill}</p>
                <p className="card-item__text reserve-font"><span className='reserve-header'>Локация:</span> {reserve.location}</p>
                <p className="card-item__text reserve-font"><span className='reserve-header'>Дата создания:</span> {reserve.creationDate}</p>
                <p className="card-item__text reserve-font"><span className='reserve-header'>Дата отмены:</span> {reserve.dueDate}</p>

                    {/*(reserve.status === 'Создан' || reserve.status === 'Подтвержден') &&*/}
                    {/*<p className="card-item__text reserve-font">*/}
                    {/*    <span className='reserve-header'>*/}
                    {/*        Осталось дней:*/}
                    {/*    </span>*/}
                    {/*    {(Date.parse(reserve.dueDate) - Date.parse(reserve.creationDate)) / 24 * 3600 * 1000 }*/}
                    {/*</p>*/}

                <p className="card-item__text reserve-font"><span className='reserve-header'>Статус:</span> {reserve.status}</p>
            </div>
        </Link>
    )
}