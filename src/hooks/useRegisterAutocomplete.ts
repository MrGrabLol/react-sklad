import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {IStandards, IStandardsRequest} from "../interfaces/exportedInterfaces";
import {BACKEND_URL} from "../ConstConfig";

export function useRegisterAutocomplete() {
    const [marks, setMarks] = useState<string[]>([])
    const [packs, setPacks] = useState<string[]>([])
    const [standards, setStandards] = useState<IStandards[]>([])
    const [manufacturers, setManufacturers] = useState<string[]>([])
    const [error, setError] = useState('')

    async function fetchAutocomplete() {
        try {
            setError('')
            const responsePacks = await axios.get<string[]>(BACKEND_URL + '/api/v1/filter/packings', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            const responseMarks =  await axios.get<string[]>(BACKEND_URL + '/api/v1/filter/marks', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            const responseManufacturers =  await axios.get<string[]>(BACKEND_URL + '/api/v1/search/manufacturer', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            const responseStandards = await axios.get<IStandardsRequest>(BACKEND_URL + '/api/v1/standard/all', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setMarks(responseMarks.data)
            setPacks(responsePacks.data)
            setStandards(responseStandards.data.marks)
            setManufacturers(responseManufacturers.data)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchAutocomplete()
    }, [])

    return {marks, packs, standards, error, manufacturers}
}