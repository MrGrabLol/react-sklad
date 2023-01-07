import '../css/ShipmentPage.css'
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {IModelsCard, IShipmentResponse} from "../interfaces/exportedInterfaces";
import {PackView} from "../components/PackView";
import {PackViewCard} from "../components/PackViewCard";

export function ShipmentPage() {
    const [customer, setCustomer] = useState('')
    const [bill, setBill] = useState('')
    const [secondStepShipping, setSecondStepShipping] = useState(false)
    const [includedArray, setIncludedArray] = useState<string>('')
    const [excludedArray, setExcludedArray] = useState<string>('')
    const [shipmentResponse, setShipmentResponse] = useState<IShipmentResponse>({packages: [], positions: []})
    const [error, setError] = useState('')
    const [cards, setCards] = useState<IModelsCard[]>([])

    async function getCards(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        try {
            const requestInc: number[] = includedArray.split(',').filter(element => element.length !== 0).map(el => Number(el))
            const requestEx: number[] = excludedArray.split(',').filter(element => element.length !== 0).map(el => Number(el))
            const response = await axios.post('http://localhost:8081/api/v1/dispatch/positions', {
                dispatch: requestInc,
                except: requestEx
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setShipmentResponse(response.data)
            let array: IModelsCard[] = []
            for (let i = 0; i < response.data.positions.length; i++) {
                array = [...array, {
                    id: response.data.positions[i].id,
                    mark: response.data.positions[i].mark,
                    diameter: response.data.positions[i].diameter,
                    packing: response.data.positions[i].packing,
                    date: response.data.positions[i].date,
                    comment: response.data.positions[i].comment,
                    part: response.data.positions[i].part,
                    plav: response.data.positions[i].plav,
                    manufacturer: response.data.positions[i].manufacturer,
                    weight: response.data.positions[i].weight,
                    status: response.data.positions[i].status,
                    location: response.data.positions[i].location,
                    type: response.data.positions[i].type,
                    standards: response.data.positions[i].standards,
                    createdFrom: response.data.positions[i].createdFrom,
                    pack: response.data.positions[i].pack,
                    positions: []
                }]
            }
            setCards(array)
            setSecondStepShipping(true)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <div className='shipping-page'>
            <form className='shipping-block' onSubmit={getCards}>
                {!secondStepShipping &&
                    <div>
                        <div className='shipping-input'>
                            <label htmlFor="ship">Отгрузить</label>
                            <input id='ship' type="text" value={includedArray} onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    setIncludedArray(includedArray + ',')
                                }
                            }} onChange={(event) => {
                                setIncludedArray(event.target.value.replace(/[^,1234567890]+/g, ''))
                            }} required/>
                        </div>
                        <div className='shipping-input'>
                            <label htmlFor="exclude">Исключить</label>
                            <input id='exclude' type="text" value={excludedArray} onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    setExcludedArray(excludedArray + ',')
                                }
                            }} onChange={(event) => {
                                setExcludedArray(event.target.value.replace(/[^,1234567890]+/g, ''))
                            }}/>
                        </div>
                        <div className='shipping-input'>
                            <div className='customer-bill'>
                                <label htmlFor="customer">Покупатель</label>
                                <input id='customer' type="text" value={customer} onChange={(event) => setCustomer(event.target.value)} required/>
                            </div>
                            <div className='customer-bill'>
                                <label htmlFor="bill">Счёт</label>
                                <input id='bill' type="text" value={bill} onChange={(event) => setBill(event.target.value.replace(/[^1234567890]+/g, ''))} required/>
                            </div>
                        </div>
                        <button type='submit' className='shipping-btn'>Получить позиции</button>
                    </div>
                }
            </form>
            <div className='shipping-margin'>
                {secondStepShipping &&
                    <div className='shipping-view-container'>
                        {shipmentResponse.packages.length > 0 &&
                            <div>
                                {shipmentResponse.packages.map(pack => <PackView pack={pack}/>)}
                            </div>
                        }
                        {shipmentResponse.positions.length > 0 &&
                            <div style={{marginTop: '30px'}}>
                                <h1>Позиции</h1>
                                <div className='card-container-ship'>
                                    {shipmentResponse.positions.map(position => <PackViewCard position={position}/>)}
                                </div>
                            </div>
                        }
                        <button type='submit' className='shipping-btn bigger'>Подтвердить отгрузку</button>
                    </div>
                }
            </div>
        </div>
    )
}