import {useEffect, useState} from "react";
import {Diameter, IModels, IModelsCard} from "../interfaces/exportedInterfaces";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";

export function useModels(accessToken: string) {
    const [cards, setCards] = useState<IModelsCard[]>([])
    const [models, setModels] = useState<IModels[]>([])
    const [packs, setPacks] = useState<string[]>([])
    const [marks, setMarks] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [diameter, setDiameter] = useState<Diameter>({min: 0, max: 0})

    async function fetchModels() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IModels[]>(BACKEND_URL + '/api/v1/filter/table', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const responseCards = await axios.get<IModelsCard[]>(BACKEND_URL + '/api/v1/position', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const responsePacks = await axios.get<string[]>(BACKEND_URL + '/api/v1/filter/packings', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const responseMarks =  await axios.get<string[]>(BACKEND_URL + '/api/v1/filter/marks', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const responseDiameter = await axios.get(BACKEND_URL + '/api/v1/filter/diameter', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            setModels(response.data)
            setCards(responseCards.data)
            setPacks(responsePacks.data)
            setMarks(responseMarks.data)
            setDiameter(responseDiameter.data)
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

    return {models, cards, marks, packs, error, loading, diameter}
}