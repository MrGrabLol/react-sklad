import {useEffect, useState} from "react";
import {IModels, IModelsCard, ResponseBody} from "../interfaces/models";
import axios, {AxiosError} from "axios";

export function useModels(response: ResponseBody) {
    const [cards, setCards] = useState<IModelsCard[]>([])
    const [models, setModels] = useState<IModels[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchModels() {
        const access = response.accessToken
        // 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZXJnZXkiLCJleHAiOjE2NjkzNzYxMTQsInJvbGVzIjpbXSwiZmlyc3ROYW1lIjoi0KHQtdGA0LPQtdC5IiwibG9jYXRpb25zIjpbIkJlbFNrbGFkIl19.-okuC9XE7nMhRaZmwkmDOl_qzBiVLaGDz5cwXLQMWbXJUKA1hnHJXUeGya7sM6y731TL29wgxB2169JzmrtYfA'
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IModels[]>('http://localhost:8081/api/v1/filter/table', {
                headers: {
                    Authorization: 'Bearer ' + access
                }
            })
            const responseCards = await axios.get<IModelsCard[]>('http://localhost:8081/api/v1/position', {
                headers: {
                    Authorization: 'Bearer ' + access
                }
            })
            setModels(response.data)
            setCards(responseCards.data)
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

    return {models, cards, error, loading}
}