import {useEffect, useState} from "react";
import {IModels, IModelsCard} from "../interfaces/models";
import axios, {AxiosError} from "axios";

export function useModels(accessToken: string) {
    const [cards, setCards] = useState<IModelsCard[]>([])
    const [models, setModels] = useState<IModels[]>([])
    const [packs, setPacks] = useState<string[]>([])
    const [marks, setMarks] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchModels() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IModels[]>('http://localhost:8081/api/v1/filter/table', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const responseCards = await axios.get<IModelsCard[]>('http://localhost:8081/api/v1/position', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const responsePacks = await axios.get<string[]>('http://localhost:8081/api/v1/filter/packings', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const responseMarks =  await axios.get<string[]>('http://localhost:8081/api/v1/filter/marks', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            setModels(response.data)
            setCards(responseCards.data)
            setPacks(responsePacks.data)
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

    return {models, cards, marks, packs, error, loading}
}