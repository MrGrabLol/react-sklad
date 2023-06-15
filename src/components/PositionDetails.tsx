import {Link, useLoaderData} from "react-router-dom";
import axios, {AxiosError} from "axios";
import '../css/CardIdViewShow.css'
import {CardView} from "./CardView";
import {BACKEND_URL} from "../ConstConfig";
import React, {useState} from "react";
import * as worker_threads from "worker_threads";

//@ts-ignore
export async function loader({params}) {
    if (!localStorage.getItem('token')) {
        const card = {mark: '', diameter: '', type: '', date: '', location: '', packing: '', part: '', plav: '', weight: '', status: '', manufacturer: '', comment: ''}
        return {card}
    } else {
        const response = await axios.get(BACKEND_URL + '/api/v1/search/' + params.id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
        const card = response.data
        return {card}
    }
}

export function PositionDetails() {

    //@ts-ignore
    const {card} = useLoaderData()

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState<string>(() => {
        if (card.status === 'В наличии') {
            return 'In_stock'
        } else if (card.status === 'Резерв') {
            return 'Reserve'
        } else if (card.status === 'В пути на склад') {
            return 'Arriving'
        } else {
            return 'Departured'
        }
    })
    const [type, setType] = useState<string>(() => {
        if (card.type === 'Позиция') {
            return 'POSITION'
        } else {
            return 'PACKAGE'
        }
    })
    const [mark, setMark] = useState<string>(card.mark)
    const [diameter, setDiameter] = useState<number>(Number(card.diameter))
    const [part, setPart] = useState<string>(card.part)
    const [plav, setPlav] = useState<string>(card.plav)
    const [packing, setPacking] = useState<string>(card.packing)
    const [weight, setWeight] = useState<number>(Number(card.weight))
    const [manufacturer, setManufacturer] = useState<string>(card.manufacturer)
    const [location, setLocation] = useState<string>(card.location)
    const [comment, setComment] = useState<string>(card.comment)

    const [error, setError] = useState<string>('')


    function checkComment() {
        return card.comment !== '';
    }

    async function sendRequest() {
        setError('')
        try {
            const loc = () => {
                if (location === 'Белорецк(Склад)') {
                    return 'BelSklad'
                } else if (location === 'Белорецк(Производство)') {
                    return 'Manufacture'
                } else {
                    return 'Solnechnogorsk'
                }
            }
            const response = await axios.post(BACKEND_URL + '/api/v1/admin/edit', {
                type: type,
                id: card.id,
                mark: mark,
                diameter: diameter,
                packing: packing,
                comment: comment,
                part: part,
                plav: plav,
                manufacturer: manufacturer,
                weight: weight,
                status: status,
                location: loc(),
                standards: card.standards
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

    return (
        <>
            <div className='mainbar-container'>
                {error && <h2 color='red'>Не удалось отредактировать позицию: {error}</h2>}
                <table className='one-card-table'>
                    <tr>
                        <td className='header'>Тип</td>
                        <td>{card.type}</td>
                    </tr>
                    <tr>
                        <td className='header'>Марка</td>
                        {
                            !editMode &&
                            <td>{card.mark}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <input className='edit-mode-input' type="text" value={mark}
                                onChange={event => setMark(event.target.value)}/>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='header'>Диаметр</td>
                        {
                            !editMode &&
                            <td>{card.diameter}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <input className='edit-mode-input' type="text" value={diameter}
                                onChange={event => setDiameter(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='header'>Упаковка</td>
                        {
                            !editMode &&
                            <td>{card.packing}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <input className='edit-mode-input' type="text" value={packing}
                                onChange={event => setPacking(event.target.value)}/>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='header'>Партия</td>
                        {
                            !editMode &&
                            <td>{card.part}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <input className='edit-mode-input' type="text" value={part}
                                onChange={event => setPart(event.target.value)}/>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='header'>Плавка</td>
                        {
                            !editMode &&
                            <td>{card.plav}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <input className='edit-mode-input' type="text" value={plav}
                                onChange={event => setPlav(event.target.value)}/>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='header'>Вес</td>
                        {
                            !editMode &&
                            <td>{card.weight}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <input className='edit-mode-input' type="text" value={weight}
                                onChange={event => setWeight(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='header'>Статус</td>
                        {
                            !editMode &&
                            <td>{card.status}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <select name="" id="" value={status}
                                        onChange={event => setStatus(event.target.value)} required>
                                    <option value="Arriving">В пути на склад</option>
                                    <option value="In_stock">В наличии</option>
                                    <option value="Reserve">Резерв</option>
                                    <option value="Departured">Отгружено</option>
                                </select>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='header'>Производитель</td>
                        {
                            !editMode &&
                            <td>{card.manufacturer}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <input className='edit-mode-input' type="text" value={manufacturer}
                                onChange={event => setManufacturer(event.target.value)}/>
                            </td>
                        }
                    </tr>
                    {
                        checkComment() &&
                        <tr>
                            <td className='header'>Комментарий</td>
                            {
                                !editMode &&
                                <td>{card.comment}</td>
                            }
                            {
                                editMode &&
                                <td>
                                    <input className='edit-mode-input' type="text" value={comment}
                                    onChange={event => setComment(event.target.value)}/>
                                </td>
                            }
                        </tr>
                    }
                    <tr>
                        <td className='header'>Локация</td>
                        {
                            !editMode &&
                            <td>{card.location}</td>
                        }
                        {
                            editMode &&
                            <td>
                                <select name="" id="" value={location}
                                        onChange={event => setLocation(event.target.value)} required>
                                    <option value="Белорецк(Производство)">Белорецк(Производство)</option>
                                    <option value="Белорецк(Склад)">Белорецк(Склад)</option>
                                    <option value="Солнечногорск">Солнечногорск</option>
                                </select>
                            </td>
                        }
                    </tr>
                    <tr>
                        <td className='header'>Дата</td>
                        <td>{card.date}</td>
                    </tr>
                    {
                        card.type === 'Позиция' && card.pack !== null &&
                        <tr>
                            <td className='header'>Поддон</td>
                            <td><Link to={'/position/' + card.pack + '/info'}>{card.pack}</Link></td>
                        </tr>
                    }
                </table>
            </div>
            {
                !editMode &&
                <button type='button' className='btn-position-edit' onClick={() => setEditMode(true)}>Редактировать поля</button>
            }
            {
                editMode &&
                <div className='edit-btn-container'>
                    <button type='button' className='btn-position-edit green' onClick={() => {
                        setEditMode(false)
                        sendRequest()
                    }}>Подтвердить поля</button>
                    <button type='button' className='btn-position-edit red' onClick={() => setEditMode(false)}>Отменить редактирование</button>
                </div>
            }
            <div className='search-cards'>
                {
                    card.type === 'Поддон' && card.positions.length > 0 &&
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{width: '97%'}}>
                            <h2>Содержит:</h2>
                            <CardView cards={card.positions}/>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}