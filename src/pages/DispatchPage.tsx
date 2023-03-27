import '../css/ShipmentPage.css'
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {IShipmentResponse} from "../interfaces/exportedInterfaces";
import {SecondStepShipping} from "../components/SecondStepShipping";
import {BACKEND_URL} from "../ConstConfig";

export function DispatchPage() {
    const [customer, setCustomer] = useState<string>('')
    const [bill, setBill] = useState<string>('')
    const [secondStepShipping, setSecondStepShipping] = useState<boolean>(false)
    const [includedArray, setIncludedArray] = useState<string>('')
    const [excludedArray, setExcludedArray] = useState<string>('')
    const [shipmentResponse, setShipmentResponse] = useState<IShipmentResponse>({packages: [], positions: []})
    const [error, setError] = useState<string>('')
    const [workStatus, setWorkStatus] = useState<boolean>(false)

    async function getCards(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        const requestInc: string[] = includedArray.split(',').filter(element => element.length !== 0)
        const requestEx: string[] = excludedArray.split(',').filter(element => element.length !== 0)
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
                if (response.data.packages.length === 0 && response.data.positions.length === 0) {
                    setError('Эти позиции уже отгружены или зарезервированы')
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
            <div className='shipping-block-container'>
                {!secondStepShipping &&
                    <form className='shipping-block' onSubmit={getCards}>
                        {error && <h2 style={{color: 'red'}}>{error}</h2>}
                        <div className='double-switch'>
                            <span id='double-switch-one' className='double-switch-span item-clicked' onClick={() => {
                                document.getElementById('double-switch-one')!.classList.add('item-clicked')
                                document.getElementById('double-switch-two')!.classList.remove('item-clicked')
                                setWorkStatus(false)
                                setCustomer('')
                            }}>Отгрузка</span>
                            <span id='double-switch-two' className='double-switch-span' onClick={() => {
                                document.getElementById('double-switch-one')!.classList.remove('item-clicked')
                                document.getElementById('double-switch-two')!.classList.add('item-clicked')
                                setWorkStatus(true)
                                setCustomer('В работу')
                            }}>В работу</span>
                        </div>
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
                        <div className='shipping-input-lower'>
                            <div className='customer-bill'>
                                <label htmlFor="customer">Покупатель</label>
                                <input id='customer' type="text" value={customer}
                                       onChange={(event) => setCustomer(event.target.value)}
                                       required placeholder=' Организация/ФИО/...' disabled={workStatus}/>
                            </div>
                            <div className='customer-bill'>
                                <label htmlFor="bill">Счёт</label>
                                <input id='bill' type="text" value={bill}
                                       onChange={(event) => setBill(event.target.value.replace(/[^1234567890]+/g, ''))}
                                       required placeholder=' Номер счёта' disabled={workStatus}/>
                            </div>
                        </div>
                        <button type='submit' className='shipping-btn'>Получить позиции</button>
                    </form>
                }
            </div>
            {secondStepShipping &&
                <div className='shipping-margin'>
                    <SecondStepShipping shipmentResponse={shipmentResponse} bill={bill} customer={customer}/>
                </div>
            }
        </div>
    )
}