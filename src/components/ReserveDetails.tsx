import {Link, useLoaderData} from "react-router-dom";
import {CardView} from "./CardView";
import {IReserve} from "../interfaces/exportedInterfaces";

export interface ReserveDetailsProps {
    reserve: IReserve
}

export function ReserveDetails() {

    const {reserve} = useLoaderData() as ReserveDetailsProps

    return (
        <div>
            <div className='mainbar-container'>
                <table className='one-card-table'>
                    <tr>
                        <td className='header'>Марка</td>
                        <td>{reserve.mark}</td>
                    </tr>
                    <tr>
                        <td className='header'>Диаметр</td>
                        <td>{reserve.diameter}</td>
                    </tr>
                    <tr>
                        <td className='header'>Упаковка</td>
                        <td>{reserve.packing}</td>
                    </tr>
                    <tr>
                        <td className='header'>Партия</td>
                        <td>{reserve.part}</td>
                    </tr>
                    <tr>
                        <td className='header'>Вес</td>
                        <td>{reserve.weight}</td>
                    </tr>
                    {
                        reserve.comment &&
                        <tr>
                            <td className='header'>Комментарий</td>
                            <td>{reserve.comment}</td>
                        </tr>
                    }
                    <tr>
                        <td className='header'>Покупатель</td>
                        <td>{reserve.customer}</td>
                    </tr>
                    <tr>
                        <td className='header'>Счёт</td>
                        <td>{reserve.bill}</td>
                    </tr>
                    <tr>
                        <td className='header'>Локация</td>
                        <td>{reserve.location}</td>
                    </tr>
                    <tr>
                        <td className='header'>Дата создания</td>
                        <td>{reserve.creationDate}</td>
                    </tr>
                    <tr>
                        <td className='header'>Дата отмены</td>
                        <td>{reserve.dueDate}</td>
                    </tr>
                    <tr>
                        <td className='header'>Осталось дней</td>
                        <td>{reserve.days}</td>
                    </tr>
                    <tr>
                        <td className='header'>Статус</td>
                        <td>{reserve.status}</td>
                    </tr>
                </table>
            </div>
            {reserve.positions.length !== 0 &&
                <div className='search-cards'>
                    <div>
                        <h2>Содержит:</h2>
                        <CardView cards={reserve.positions}/>
                    </div>
                </div>
            }
        </div>
    )
}