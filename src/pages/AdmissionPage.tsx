import {ErrorMessage} from "../components/ErrorMessage";
import {CardView} from "../components/CardView";
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import {IPositionsResponse} from "../interfaces/exportedInterfaces";
import '../css/AdmissionPage.css'

export function AdmissionPage() {
    const [error, setError] = useState<string>('')
    const [cardError, setCardError] = useState<string>('')
    const [cards, setCards] = useState<IPositionsResponse[]>([])
    const [ids, setIds] = useState<string>('')
    const [successRequest, setSuccessRequest] = useState<boolean>(false)

    async function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault()
        const request = ids.replace(/[^,1234567890]+/g, '')
            .split(',')
            .filter((element) => element.length !== 0)
        if (request.length > 0) {
            try {
                setError('')
                setCardError('')
                const response = await axios.post(BACKEND_URL + '/api/v1/search', {
                    positions: request
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                let id = ''
                for (const el of response.data) {
                    if (el.status !== 'В пути на склад') {
                        id = id + el.id + ' '
                    }
                }
                if (id !== '') {
                    setCardError('Некорректный статус у следующих id позиций - ' + id)
                }
                setCards(response.data)
            } catch (e: unknown) {
                const error = e as AxiosError
                setError(error.message)
            }
        }
        setIds(ids.concat(','))
    }

    async function sendRequest() {
        try {
            const response = await axios.put(BACKEND_URL + '/api/v1/transfer', {
                positions: ids.split(',').filter((element) => element.length !== 0)
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (response.status === 200) {
                setSuccessRequest(true)
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <div className='card-id-confirm-scan'>
            <div className='input-block'>
                <form onSubmit={submitHandler}>
                    <input type="text" style={{fontSize: '16px'}} placeholder='Введите ID' value={ids}
                           onChange={event => setIds(event.target.value.replace(/[^,1234567890]+/g, ''))} />
                    <button type='submit' style={{fontSize: '16px'}}>Найти</button>
                </form>
                {error && <ErrorMessage error={error}/>}
                {cardError && <ErrorMessage error={cardError}/>}
                {successRequest && <h2 style={{color: 'green'}}>Позиции приняты на склад</h2>}
            </div>
            <div className='search-cards' style={{width: '100%'}}>
                {!error && cards !== undefined &&
                    <CardView cards={cards}/>
                }
            </div>
            {cards.length !== 0 && !cardError && !error &&
                <button type='button' className='admission-confirm-button' onClick={sendRequest} disabled={successRequest}>Подтвердить прибытие</button>
            }
        </div>
    )
}