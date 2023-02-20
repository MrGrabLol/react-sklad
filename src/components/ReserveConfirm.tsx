import {useState} from "react";
import {IModelsCard} from "../interfaces/exportedInterfaces";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import {ErrorMessage} from "./ErrorMessage";
import {CardView} from "./CardView";
import '../css/ReserveConfirm.css'
import {useLoaderData, useNavigate} from "react-router-dom";
import {ReserveDetailsProps} from "./ReserveDetails";

export function ReserveConfirm() {
    const [id, setId] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [weightError, setWeightError] = useState<string>('')
    const [correspondError, setCorrespondError] = useState<string>('')
    const [cards, setCards] = useState<IModelsCard[]>()
    const [checked, setChecked] = useState(false)
    const [confirmedReserve, setConfirmedReserve] = useState<string[]>([])
    const [overallWeight, setOverallWeight] = useState<number>(0)
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const navigate = useNavigate()
    const {reserve} = useLoaderData() as ReserveDetailsProps

    const submitHandler = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setError('')
        setWeightError('')
        setCorrespondError('')
        setButtonDisable(false)
        const request = id.replace(/[^,1234567890]+/g, '')
            .split(',')
            .filter((element) => element.length !== 0)
        setConfirmedReserve(request)
        if (request.length > 0) {
            try {
                const response = await axios.post<IModelsCard[]>(BACKEND_URL + '/api/v1/search', {
                    positions: request
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                setOverallWeight(response.data.reduce((acc, card) => acc + Number(card.weight), 0))
                setCards(response.data)
                let ids = ''
                for (const el of response.data) {
                    if (el.mark !== reserve.mark || el.diameter !== reserve.diameter || el.packing !== reserve.packing ||
                        (reserve.part !== '' && (el.part !== reserve.part)) || el.status === 'Отгружено') {
                        ids = ids + String(el.id) + ' '
                    }
                }
                if (ids !== '') {
                    setCorrespondError('неподходящие значения для резерва у следующих позиций - ' + ids)
                    setButtonDisable(true)
                }
                if (response.data.reduce((acc, card) => acc + Number(card.weight), 0) > reserve.weight + reserve.weight / 100 * 10 ||
                    response.data.reduce((acc, card) => acc + Number(card.weight), 0) < reserve.weight - reserve.weight / 100 * 10) {
                    setWeightError('вес не соответствует заявленному в резерве')
                    setButtonDisable(true)
                }
            } catch (e: unknown) {
                const error = e as AxiosError
                setError(error.message)
                setCards(undefined)
            }
        }
        if (checked) {
            setId(id.concat(','))
        } else {
            setId('')
        }
    }

    const sendRequest = async () => {
        setError('')
        try {
            const response = await axios.put(BACKEND_URL + '/api/v1/reserve/' + reserve.id, {
                positions: confirmedReserve
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (response.status === 200) {
                navigate('/reserve')
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <div>
            {reserve.status === 'Подтвержден' &&
                <h2 className='reserve-header-warning' style={{color: 'rgb(253, 185, 0)'}}>Резерв уже подтвержден</h2>
            }
            {(reserve.status === 'Отменен' || reserve.status === 'Истек срок') &&
                <h2 className='reserve-header-warning' style={{color: 'red'}}>Нельзя подтвердить резерв который был отменен / у которого истек срок</h2>
            }
            {reserve.status === 'Отгружен' &&
                <h2 className='reserve-header-warning' style={{color: 'rgb(253, 185, 0)'}}>Резерв уже отгружен</h2>
            }
            {reserve.status === 'Создан' &&
                <div className='card-id-confirm-scan'>
                    <div className='input-block'>
                        <label className='check-label'>
                            <input type="checkbox" className='check-input' checked={checked}
                                   onChange={() => setChecked(!checked)}/>
                            <span className='checkmark'></span>
                            <p style={{marginLeft: '14px'}}>Ввод нескольких позиций</p>
                        </label>
                        <form onSubmit={submitHandler}>
                            <input type="text" style={{fontSize: '16px'}} placeholder='Введите ID' value={id}
                                   onChange={event => setId(event.target.value.replace(/[^,1234567890]+/g, ''))}/>
                            <button type='submit' style={{fontSize: '16px'}}>Найти</button>
                            {error && <ErrorMessage error={error}/>}
                            {weightError && <ErrorMessage error={weightError}/>}
                            {correspondError && <ErrorMessage error={correspondError}/>}
                            <h2>Вес: <span
                                style={{color: overallWeight > reserve.weight + reserve.weight / 100 * 10 || overallWeight < reserve.weight - reserve.weight / 100 * 10 ? 'red' : 'green'}}>{overallWeight}</span> / {reserve.weight}
                            </h2>
                        </form>
                    </div>
                    <div className='search-cards' style={{width: '100%'}}>
                        {!error && cards !== undefined &&
                            <div>
                                <CardView cards={cards}/>
                                <button type='button' onClick={sendRequest} className='confirm-reserve-btn'
                                        disabled={buttonDisable}>Подтвердить резерв
                                </button>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}