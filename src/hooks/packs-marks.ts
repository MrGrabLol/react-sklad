import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";

export function usePacks() {
    const [packs, setPacks] = useState<string[]>([])
    const [marks, setMarks] = useState<string[]>([])
    const [error, setError] = useState('')
    async function fetchPacksMarks() {
        const access = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZXJnZXkiLCJleHAiOjE2NjkzNzYxMTQsInJvbGVzIjpbXSwiZmlyc3ROYW1lIjoi0KHQtdGA0LPQtdC5IiwibG9jYXRpb25zIjpbIkJlbFNrbGFkIl19.-okuC9XE7nMhRaZmwkmDOl_qzBiVLaGDz5cwXLQMWbXJUKA1hnHJXUeGya7sM6y731TL29wgxB2169JzmrtYfA'
        try {
            setError('')
            const responsePacks = await axios.get<string[]>('http://localhost:8081/api/v1/filter/packings', {
                headers: {
                    Authorization: 'Bearer ' + access
                }
            })
            const responseMarks =  await axios.get<string[]>('http://localhost:8081/api/v1/filter/marks', {
                headers: {
                    Authorization: 'Bearer ' + access
                }
            })
            setPacks(responsePacks.data)
            setMarks(responseMarks.data)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchPacksMarks()
    }, [])

    return {error, packs, marks}
}