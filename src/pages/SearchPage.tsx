import '../css/SearchPage.css'
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {ErrorMessage} from "../components/ErrorMessage";
import {IModelsCard} from "../interfaces/exportedInterfaces";
import '../css/Checkbox.css'
import {CardView} from "../components/CardView";
import {BACKEND_URL} from "../ConstConfig";
import useToken from "../hooks/useToken";

export function SearchPage() {
    const [id, setId] = useState<string>('')
    const [error, setError] = useState('')
    const [cards, setCards] = useState<IModelsCard[]>()
    const [checked, setChecked] = useState(false)
    const {token, setToken} = useToken()

    const submitHandler = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const request = id.replace(/[^,1234567890]+/g, '')
            .split(',')
            .filter((v) => v.length !== 0)
        if (request.length > 0) {
            try {
                setError('')
                const response = await axios.post(BACKEND_URL + '/api/v1/search', {
                    positions: request
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                setCards(response.data)
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

    return (
        <div>
            <div className='input-block'>
                <label className='check-label'>
                    <input type="checkbox" className='check-input' checked={checked} onChange={() => setChecked(!checked)}/>
                    <span className='checkmark'></span>
                    <p>Ввод нескольких позиций</p>
                </label>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='Введите ID' value={id}
                           onChange={event => setId(event.target.value.replace(/[^,1234567890]+/g, ''))} />
                    <button type='submit'>Найти</button>
                </form>
                {error && <ErrorMessage error={error}/>}
            </div>
            <div className='search-cards'>
                {!error && cards !== undefined &&
                    <CardView cards={cards}/>
                }
            </div>
        </div>
    )
}