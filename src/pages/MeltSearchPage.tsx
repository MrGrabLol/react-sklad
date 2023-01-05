import '../css/SearchPage.css'
import {SearchAutoComplete} from "../components/SearchAutoComplete";
import {useState} from "react";
import {SearchTableView} from "../components/SearchTableView";
import {ISearchAutoComplete, ISearchModels} from "../interfaces/exportedInterfaces";
import axios, {AxiosError} from "axios";
import {ErrorMessage} from "../components/ErrorMessage";
import {BACKEND_URL} from "../ConstConfig";
import useToken from "../hooks/useToken";

export function MeltSearchPage() {
    const {token, setToken} = useToken()
    const [request, setRequest] = useState(false)
    const [state, setState] = useState<ISearchAutoComplete>({
        activeSuggestion: 0,
        markSuggestions: [],
        partSuggestions: [],
        heatSuggestions: [],
        showSuggestions: false,
        userInput: ''
    })
    const [models, setModels] = useState<ISearchModels[]>([])
    const [error, setError] = useState('')

    async function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault()
        try {
            setError('')
            const response = await axios.post('http://localhost:8081/api/v1/search/params', {
                query: state.userInput
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            setModels(response.data.rows)
            setRequest(true)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <div>
            <form className='input-block' onSubmit={submitHandler}>
                <button type='submit'>Найти</button>
                <SearchAutoComplete state={state} setState={setState}/>
            </form>
            {error && <ErrorMessage error={error}/>}
            {request &&
                <SearchTableView models={models}/>
            }
        </div>
    )
}