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

    function setArray() {
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
    }

    const [idWeightArray, setIdWeightArray] = useState<IShipping[]>(setArray)
    const [initialIdWeightArray] = useState<IShipping[]>(setArray)
    const [error, setError] = useState('')
    const [shippingStepThree, setShippingStepThree] = useState(false)
    const [shippingStepThreeFullDispatch, setShippingStepThreeFullDispatch] = useState(false)
    const [thirdStepResponse, setThirdStepResponse] = useState<IThirdStepShipping>({print: [], new: []})

    async function stepTwoRequest(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        if (idWeightArray.filter(element => element.weight === 0 || element.weight > initialIdWeightArray.find(el => el.id === element.id)!.weight).length > 0) {
            setError('введите корректные значения в поля веса')
        } else {
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
                if (response.data.print.length === 0 && response.data.new.length === 0) {
                    setShippingStepThreeFullDispatch(true)
                } else {
                    setThirdStepResponse(response.data)
                    setShippingStepThree(true)
                }
            } catch (e: unknown) {
                const error = e as AxiosError
                setError(error.message)
            }
        }
    }

    return (
        <div>
            {shippingStepThreeFullDispatch && <h2 style={{color: 'green'}}>Все позиции успешно отгружены</h2>}
            {!shippingStepThree &&
                <form className='shipping-view-container' onSubmit={stepTwoRequest}>
                    {error && <h2 style={{color: 'red'}}>Ошибка отправки запроса: {error}</h2>}
                    {shipmentResponse.packages.length > 0 &&
                        <div>
                            {shipmentResponse.packages.map((pack, index) =>
                                <PackView pack={pack} key={index} idWeightArray={idWeightArray} disabledField={shippingStepThreeFullDispatch}/>)
                            }
                        </div>
                    }
                    {shipmentResponse.positions.length > 0 &&
                        <div style={{marginTop: '30px'}}>
                            <h1>Позиции</h1>
                            <div className='card-container-ship'>
                                {shipmentResponse.positions.map((position, index) =>
                                    <PackViewCard position={position} key={index} index={index} idWeightArray={idWeightArray} disabledField={shippingStepThreeFullDispatch}/>)
                                }
                            </div>
                        </div>
                    }
                    <button type='submit' className='shipping-btn bigger' disabled={shippingStepThreeFullDispatch}>Подтвердить отгрузку</button>
                </form>
            }
            {shippingStepThree &&
                <ThirdStepShipping object={thirdStepResponse}/>
            }
        </div>

    )
}