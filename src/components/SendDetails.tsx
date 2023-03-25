import axios from "axios";
import {BACKEND_URL} from "../ConstConfig";
import {ISendHistoryFields} from "../interfaces/exportedInterfaces";
import {Link, useLoaderData} from "react-router-dom";
import {CardView} from "./CardView";

//@ts-ignore
export async function transferLoader({params}) {
    if (!localStorage.getItem('token')) {
        return {
            id: 0, source: '', destination: '', creator: '', date: '', positions: [], createdDate: '', status: '', carPlate: ''
        }
    } else {
        const response = await axios.get(BACKEND_URL + '/api/v1/transfer/' + params.id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        const transfer: ISendHistoryFields = response.data
        return {transfer}
    }
}

interface ISendDetailsProps {
    transfer: ISendHistoryFields
}

export function SendDetails() {
    const {transfer} = useLoaderData() as ISendDetailsProps

    return (
        <>
            <div className='mainbar-container'>
                <table className='one-card-table' style={{marginBottom: '0'}}>
                    <tr>
                        <td className='header'>Id</td>
                        <td>{transfer.id}</td>
                    </tr>
                    <tr>
                        <td className='header'>Откуда</td>
                        <td>{transfer.source}</td>
                    </tr>
                    <tr>
                        <td className='header'>Куда</td>
                        <td>{transfer.destination}</td>
                    </tr>
                    <tr>
                        <td className='header'>Упаковка</td>
                        <td>{transfer.status}</td>
                    </tr>
                    <tr>
                        <td className='header'>Партия</td>
                        <td>{transfer.createdDate}</td>
                    </tr>
                    <tr>
                        <td className='header'>Плавка</td>
                        <td>{transfer.creator}</td>
                    </tr>
                    <tr>
                        <td className='header'>Вес</td>
                        <td>{transfer.carPlate.length > 0 ? transfer.carPlate : 'Не указан'}</td>
                    </tr>
                </table>
            </div>
            <div className='search-cards' style={{marginTop: '10px'}}>
                <h2>Перевозятся:</h2>
                <CardView cards={transfer.positions}/>
            </div>
        </>
    )
}