import {PackView} from "./PackView";
import {PackViewCard} from "./PackViewCard";
import {IShipmentResponse, IShipping, IThirdStepShipping} from "../interfaces/exportedInterfaces";
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {ThirdStepShipping} from "./ThirdStepShipping";
import {BACKEND_URL} from "../ConstConfig";

interface SecondStepShippingProps {
    shipmentResponse: IShipmentResponse,
    bill: string,
    customer: string
}

export function SecondStepShipping({shipmentResponse, bill, customer}: SecondStepShippingProps) {

    const [idWeightArray, setIdWeightArray] = useState<IShipping[]>(() => {
        let array: IShipping[] = []
        if (shipmentResponse.packages.length > 0) {
            shipmentResponse.packages.forEach(pack => {
                pack.positions.forEach(position => {
                    array = [...array, {id: position.id, weight: Number(position.weight)}]
                })
            })
            if (shipmentResponse.positions.length > 0) {
                shipmentResponse.positions.forEach(position => {
                    array = [...array, {id: position.id, weight: Number(position.weight)}]
                })
            }
        } else {
            shipmentResponse.positions.forEach(position => {
                array = [...array, {id: position.id, weight: Number(position.weight)}]
            })
        }
        return array
    })
    const [error, setError] = useState('')
    const [shippingStepThree, setShippingStepThree] = useState(false)
    const [thirdStepResponse, setThirdStepResponse] = useState<IThirdStepShipping>({print: [], new: []})

    async function stepTwoRequest(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        try {
            const response = await axios.post(BACKEND_URL + '/api/v1/dispatch/confirm', {
                positions: idWeightArray,
                bill: bill,
                customer: customer
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setThirdStepResponse(response.data)
            setShippingStepThree(true)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <div>
            {!shippingStepThree &&
                <form className='shipping-view-container' onSubmit={stepTwoRequest}>
                    {error && <h2>Ошибка отправки запроса: {error}</h2>}
                    {shipmentResponse.packages.length > 0 &&
                        <div>
                            {shipmentResponse.packages.map((pack, index) => <PackView pack={pack} key={index} idWeightArray={idWeightArray}/>)}
                        </div>
                    }
                    {shipmentResponse.positions.length > 0 &&
                        <div style={{marginTop: '30px'}}>
                            <h1>Позиции</h1>
                            <div className='card-container-ship'>
                                {shipmentResponse.positions.map((position, index) => <PackViewCard position={position} key={index} index={index} idWeightArray={idWeightArray}/>)}
                            </div>
                        </div>
                    }
                    <button type='submit' className='shipping-btn bigger'>Подтвердить отгрузку</button>
                </form>
            }
            {shippingStepThree &&
                <ThirdStepShipping object={thirdStepResponse}/>
            }
        </div>

    )
}