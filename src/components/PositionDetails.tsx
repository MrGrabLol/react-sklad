import {Link, useLoaderData} from "react-router-dom";
import axios from "axios";
import {IModelsCard} from "../interfaces/exportedInterfaces";
import '../css/CardIdViewShow.css'
import {CardView} from "./CardView";
import {BACKEND_URL} from "../ConstConfig";

//@ts-ignore
export async function loader({params}) {
    const response = await axios.get('http://localhost:8081/api/v1/search/' + params.id, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    const card = response.data
    return {card}
}

export function PositionDetails() {

    //@ts-ignore
    const {card} = useLoaderData()

    function checkComment() {
        return card.comment !== '';
    }

    return (
        <>
            <div className='mainbar-container'>
                <table className='one-card-table'>
                    <tr>
                        <td className='header'>Тип</td>
                        <td>{card.type}</td>
                    </tr>
                    <tr>
                        <td className='header'>Марка</td>
                        <td>{card.mark}</td>
                    </tr>
                    <tr>
                        <td className='header'>Диаметр</td>
                        <td>{card.diameter}</td>
                    </tr>
                    <tr>
                        <td className='header'>Упаковка</td>
                        <td>{card.packing}</td>
                    </tr>
                    <tr>
                        <td className='header'>Партия</td>
                        <td>{card.part}</td>
                    </tr>
                    <tr>
                        <td className='header'>Плавка</td>
                        <td>{card.plav}</td>
                    </tr>
                    <tr>
                        <td className='header'>Вес</td>
                        <td>{card.weight}</td>
                    </tr>
                    <tr>
                        <td className='header'>Статус</td>
                        <td>{card.status}</td>
                    </tr>
                    <tr>
                        <td className='header'>Производитель</td>
                        <td>{card.manufacturer}</td>
                    </tr>
                    {
                        checkComment() &&
                        <tr>
                            <td className='header'>Комментарий</td>
                            <td>{card.comment}</td>
                        </tr>
                    }
                    <tr>
                        <td className='header'>Локация</td>
                        <td>{card.location}</td>
                    </tr>
                    <tr>
                        <td className='header'>Дата</td>
                        <td>{card.date}</td>
                    </tr>
                    {
                        card.type === 'Позиция' && card.pack !== null &&
                        <tr>
                            <td className='header'>Поддон</td>
                            <td><Link to={'/position/' + card.pack}>{card.pack}</Link></td>
                        </tr>
                    }
                </table>
            </div>
            <div className='search-cards'>
                {
                    card.type === 'Поддон' && card.positions.length > 0 &&
                    <div>
                        <h2>Содержит:</h2>
                        <CardView cards={card.positions}/>
                    </div>

                }
            </div>
        </>
    )
}