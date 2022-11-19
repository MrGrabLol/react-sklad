import {useEffect, useState} from "react";
import {IModels, IModelsCard} from "../interfaces/models";
import axios, {AxiosError} from "axios";

export function useModels() {
    const [cards, setCards] = useState<IModelsCard[]>([])
    const [models, setModels] = useState<IModels[]>([])
    const [marks, setMarks] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchModels() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IModels[]>('http://localhost:8081/api/v1/filter/table', {
                headers: {
                    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZXJnZXkiLCJleHAiOjE2Njg5NTAzMjcsInJvbGVzIjpbXSwiZmlyc3ROYW1lIjoi0KHQtdGA0LPQtdC5IiwibG9jYXRpb25zIjpbIkJlbFNrbGFkIl19.TSs8kjDcXpa1GG1CCTCTqE1JphfLUBTneI4oWnVwlhkNNU6wCsJ7XU62E4YvA9Y71rs2KxWQK-ZqqJnuHFmG9A'
                }
            })
            const responseCards = await axios.get<IModelsCard[]>('http://localhost:8081/api/v1/position', {
                headers: {
                    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZXJnZXkiLCJleHAiOjE2Njg5NTAzMjcsInJvbGVzIjpbXSwiZmlyc3ROYW1lIjoi0KHQtdGA0LPQtdC5IiwibG9jYXRpb25zIjpbIkJlbFNrbGFkIl19.TSs8kjDcXpa1GG1CCTCTqE1JphfLUBTneI4oWnVwlhkNNU6wCsJ7XU62E4YvA9Y71rs2KxWQK-ZqqJnuHFmG9A'
                }
            })
            const responseMarks = await axios.get<string[]>('http://localhost:8081/api/v1/filter/marks', {
                headers: {
                    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZXJnZXkiLCJleHAiOjE2Njg5NTAzMjcsInJvbGVzIjpbXSwiZmlyc3ROYW1lIjoi0KHQtdGA0LPQtdC5IiwibG9jYXRpb25zIjpbIkJlbFNrbGFkIl19.TSs8kjDcXpa1GG1CCTCTqE1JphfLUBTneI4oWnVwlhkNNU6wCsJ7XU62E4YvA9Y71rs2KxWQK-ZqqJnuHFmG9A'
                }
            })
            setModels(response.data)
            setCards(responseCards.data)
            setMarks(responseMarks.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }

    }

    useEffect(() => {
        fetchModels()
    }, [])

    return {models, cards, marks, error, loading}
}