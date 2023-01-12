import '../css/ShipmentPage.css'
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {ISecondStepShipping, IShipmentResponse, IShipping} from "../interfaces/exportedInterfaces";
import {SecondStepShipping} from "../components/SecondStepShipping";
import {BACKEND_URL} from "../ConstConfig";
import {useNavigate} from "react-router-dom";

export function ShipmentPage() {
    const [customer, setCustomer] = useState('')
    const [bill, setBill] = useState('')
    const [secondStepShipping, setSecondStepShipping] = useState(false)
    const [includedArray, setIncludedArray] = useState<string>('')
    const [excludedArray, setExcludedArray] = useState<string>('')
    const [shipmentResponse, setShipmentResponse] = useState<IShipmentResponse>({packages: [], positions: []})
    const [error, setError] = useState('')

    async function getCards(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        const requestInc: number[] = includedArray.split(',').filter(element => element.length !== 0).map(el => Number(el))
        const requestEx: number[] = excludedArray.split(',').filter(element => element.length !== 0).map(el => Number(el))
        if (requestInc.length === 0) {
            setError('Введите корректные значения')
        } else {
            try {
                const response = await axios.post(BACKEND_URL + '/api/v1/dispatch/positions', {
                    dispatch: requestInc,
                    except: requestEx
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                if (response.data.packages.length === 0 && response.data.positions.length === 0 ) {
                    setError('Эти позиции уже отгружены')
                } else {
                    setShipmentResponse(response.data)
                    setSecondStepShipping(true)
                }
            } catch (e: unknown) {
                const error = e as AxiosError
                setError(error.message)
            }
        }
    }

    return (
        <div className='shipping-page'>
            {!secondStepShipping &&
            <form className='shipping-block' onSubmit={getCards}>
                {error && <h2 style={{color: 'red'}}>{error}</h2>}
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
                            }} required placeholder=' ID позиций или поддонов'/>
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
                            }} placeholder=' ID позиций'/>
                        </div>
                        <div className='shipping-input'>
                            <div className='customer-bill'>
                                <label htmlFor="customer">Покупатель</label>
                                <input id='customer' type="text" value={customer} onChange={(event) => setCustomer(event.target.value)}
                                       required placeholder=' Наименование организации/ФИО/...'/>
                            </div>
                            <div className='customer-bill'>
                                <label htmlFor="bill">Счёт</label>
                                <input id='bill' type="text" value={bill}
                                       onChange={(event) => setBill(event.target.value.replace(/[^1234567890]+/g, ''))}
                                       required placeholder=' Номер счёта'/>
                            </div>
                        </div>
                        <button type='submit' className='shipping-btn'>Получить позиции</button>
                    </div>
            </form>
            }
            <div className='shipping-margin'>
                {secondStepShipping &&
                    <SecondStepShipping shipmentResponse={shipmentResponse} bill={bill} customer={customer}/>
                }
            </div>
        </div>
    )
}