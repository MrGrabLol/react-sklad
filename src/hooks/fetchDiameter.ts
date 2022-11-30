import axios, {AxiosError} from "axios";
import {Diameter} from "../interfaces/models";

export function fetchDiameter(accessToken: string) {
    async function check() {
        const responseDiameter = await axios.get('http://localhost:8081/api/v1/filter/diameter', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        return responseDiameter.data
    }
    const a =  <unknown>check() as Diameter

    return a
}