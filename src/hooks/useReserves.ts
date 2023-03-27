import {useEffect, useState} from "react";
import {IReserve} from "../interfaces/exportedInterfaces";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";

export function useReserves() {
    const [reserves, setReserves] = useState<IReserve[]>([])
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false)

    async function fetchReserves() {
        try {
            setLoader(true)
            setError('')
            const response = await axios.get(BACKEND_URL + '/api/v1/reserve', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setReserves(response.data)
            setLoader(false)
        } catch (e: unknown) {
            setLoader(false)
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchReserves()
    }, [])

    return {reserves, error, loader}
}