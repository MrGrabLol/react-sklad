import {useEffect, useState} from "react";
import {ISendHistory} from "../interfaces/exportedInterfaces";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";

export function useSendHistory() {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [sendHistory, setSendHistory] = useState<ISendHistory>({transfers: []})

    async function fetchSendHistory() {
        try {
            setLoading(true)
            const response = await axios.get(BACKEND_URL + '/api/v1/transfer', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setSendHistory(response.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSendHistory()
    }, [])

    return {sendHistory, error, loading}
}