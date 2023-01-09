import {useEffect, useState} from "react";
import {IShippingHistory} from "../interfaces/exportedInterfaces";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";

export function useShippingHistory() {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [shippingHistory, setShippingHistory] = useState<IShippingHistory[]>([])

    async function fetchHistory() {
        try {
            setLoading(true)
            const response = await axios.get(BACKEND_URL + '/api/v1/dispatch', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setShippingHistory(response.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    return {shippingHistory, error, loading}
}