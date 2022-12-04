import '../css/SearchPage.css'
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {ErrorMessage} from "../components/ErrorMessage";
import {Card} from "../components/Card";
import {IModelsCard} from "../interfaces/models";

interface SearchPageProps {
    token: string
}

export function SearchPage({token}: SearchPageProps) {
    const [id, setId] = useState()
    const [error, setError] = useState('')
    const [card, setCard] = useState<IModelsCard>()

    const submitHandler = async () => {
        setId(id)
        try {
            const response = await axios.post('http://localhost:8081/api/v1/search', {
                id
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            setCard(response.data)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <div>
            <form className='input-block' onSubmit={submitHandler}>
                <input type="text" value={id} />
                <button type='submit'>Найти</button>
            </form>
            {error && <ErrorMessage error={error}/>}
            {!error && card &&
                <Card card={card}/>
            }
        </div>
    )
}