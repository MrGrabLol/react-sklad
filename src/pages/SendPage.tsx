import {useState} from "react";
import '../css/SendPage.css'
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import {CardView} from "../components/CardView";
import {IPositionsResponse} from "../interfaces/exportedInterfaces";

export function SendPage() {
    const [sendTo, setSendTo] = useState<string>('')
    const [sendFrom, setSendFrom] = useState<string>(() => {
        if (localStorage.getItem('location')! === 'Manufacture') {
            return 'Белорецк(Производство)'
        } else if (localStorage.getItem('location')! === 'BelSklad') {
            return 'Белорецк(Склад)'
        } else if (localStorage.getItem('location')! === 'Solnechnogorsk') {
            return 'Солнечногорск'
        } else {
            return ''
        }
    })
    const [plates, setPlates] = useState<string>('')
    const [region, setRegion] = useState<string>('')
    const [ids, setIds] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [cardError, setCardError] = useState<string>('')
    const [locError, setLocError] = useState<string>('')
    const [cards, setCards] = useState<IPositionsResponse[]>([])
    const [successRequest, setSuccessRequest] = useState<boolean>(false)

    async function findIds() {
        setError('')
        setLocError('')
        setCardError('')
        if (sendFrom === '' || sendTo === '') {
            setLocError('Выберите откуда/куда перевозить позиции')
        } else if (sendTo === sendFrom) {
            setLocError('Локации не могут совпадать')
        } else {
            const request = ids.replace(/[^,1234567890]+/g, '')
                .split(',')
                .filter((element) => element.length !== 0)
            if (request.length > 0) {
                try {
                    setError('')
                    const response = await axios.post(BACKEND_URL + '/api/v1/search', {
                        positions: request
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    let id = ''
                    for (const el of response.data) {
                        if (el.location !== sendFrom || el.status === 'Отгружено' || el.status === 'В пути на склад') {
                            id = id + el.id + ' '
                        }
                    }
                    if (id !== '') {
                        setCardError('Некорректная локация или статус у следующих id позиций - ' + id)
                    }
                    setCards(response.data)
                } catch (e: unknown) {
                    const error = e as AxiosError
                    setError(error.message)
                }
            }
            setIds(ids.concat(','))
        }
    }

    async function sendPositions() {
        try {
            const tempDestination = () => {
                if (sendTo === 'Белорецк(Склад)') {
                    return 'BelSklad'
                } else if (sendTo === 'Белорецк(Производство)') {
                    return 'Manufacture'
                } else {
                    return 'Solnechnogorsk'
                }
            }
            const tempSource = () => {
                if (sendFrom === 'Белорецк(Склад)') {
                    return 'BelSklad'
                } else if (sendFrom === 'Белорецк(Производство)') {
                    return 'Manufacture'
                } else {
                    return 'Solnechnogorsk'
                }
            }
            const response = await axios.post(BACKEND_URL + '/api/v1/transfer', {
                carPlate: plates.toUpperCase() + ' ' + region,
                positions: ids.split(',').filter((element) => element.length !== 0),
                destination: tempDestination(),
                source: tempSource()
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (response.status === 200) {
                setSuccessRequest(true)
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    return (
        <div className='send-page-container'>
            {(sendFrom === '' || localStorage.getItem('roles')?.includes('ADMIN')) &&
                <h2>Отправить с:</h2>
            }
            {(sendFrom === '' || localStorage.getItem('roles')?.includes('ADMIN')) &&
                <div className='triple-switch'>
                    <span id='span-one' className='item-notclicked' onClick={() => {
                        setLocError('')
                        setSendFrom('Белорецк(Склад)')
                        if (sendTo === 'Белорецк(Склад)') {
                            setLocError('Локации не могут совпадать')
                        }
                        if (cards.length !== 0) {
                            let id = ''
                            for (const el of cards) {
                                if (el.location !== 'Белорецк(Склад)') {
                                    id = id + el.id + ' '
                                }
                            }
                            if (id !== '') {
                                setCardError('Некорректная локация у следующих id позиций - ' + id)
                            } else {
                                setCardError('')
                            }
                        }
                        const element1 = document.getElementById('span-one')!
                        const element2 = document.getElementById('span-two')!
                        const element3 = document.getElementById('span-three')!
                        element1.classList.add('item-clicked')
                        element2.classList.remove('item-clicked')
                        element3.classList.remove('item-clicked')
                    }}><label>Белорецк</label></span>
                    <span id='span-two' className='item-notclicked' onClick={() => {
                        setLocError('')
                        setSendFrom('Солнечногорск')
                        if (sendTo === 'Солнечногорск') {
                            setLocError('Локации не могут совпадать')
                        }
                        if (cards.length !== 0) {
                            let id = ''
                            for (const el of cards) {
                                if (el.location !== 'Солнечногорск') {
                                    id = id + el.id + ' '
                                }
                            }
                            if (id !== '') {
                                setCardError('Некорректная локация у следующих id позиций - ' + id)
                            } else {
                                setCardError('')
                            }
                        }
                        const element1 = document.getElementById('span-one')!
                        const element2 = document.getElementById('span-two')!
                        const element3 = document.getElementById('span-three')!
                        element2.classList.add('item-clicked')
                        element1.classList.remove('item-clicked')
                        element3.classList.remove('item-clicked')
                    }}><label>Солнечногорск</label></span>
                    <span id='span-three' className='item-notclicked' onClick={() => {
                        setLocError('')
                        setSendFrom('Белорецк(Производство)')
                        if (sendTo === 'Белорецк(Производство)') {
                            setLocError('Локации не могут совпадать')
                        }
                        if (cards.length !== 0) {
                            let id = ''
                            for (const el of cards) {
                                if (el.location !== 'Белорецк(Производство)') {
                                    id = id + el.id + ' '
                                }
                            }
                            if (id !== '') {
                                setCardError('Некорректная локация у следующих id позиций - ' + id)
                            } else {
                                setCardError('')
                            }
                        }
                        const element1 = document.getElementById('span-one')!
                        const element2 = document.getElementById('span-two')!
                        const element3 = document.getElementById('span-three')!
                        element3.classList.add('item-clicked')
                        element2.classList.remove('item-clicked')
                        element1.classList.remove('item-clicked')
                    }}><label>Производство</label></span>
                </div>
            }
            <h2>Отправить на:</h2>
            <div className='triple-switch'>
                <span id='span-four' className='item-notclicked' onClick={() => {
                    setLocError('')
                    setSendTo('Белорецк(Склад)')
                    if (sendFrom === 'Белорецк(Склад)') {
                        setLocError('Локации не могут совпадать')
                    }
                    const element1 = document.getElementById('span-four')!
                    const element2 = document.getElementById('span-five')!
                    const element3 = document.getElementById('span-six')!
                    element1.classList.add('item-clicked')
                    element2.classList.remove('item-clicked')
                    element3.classList.remove('item-clicked')
                }}><label>Белорецк</label></span>
                <span id='span-five' className='item-notclicked' onClick={() => {
                    setLocError('')
                    setSendTo('Солнечногорск')
                    if (sendFrom === 'Солнечногорск') {
                        setLocError('Локации не могут совпадать')
                    }
                    const element1 = document.getElementById('span-four')!
                    const element2 = document.getElementById('span-five')!
                    const element3 = document.getElementById('span-six')!
                    element2.classList.add('item-clicked')
                    element1.classList.remove('item-clicked')
                    element3.classList.remove('item-clicked')
                }}><label>Солнечногорск</label></span>
                <span id='span-six' className='item-notclicked' onClick={() => {
                    setLocError('')
                    setSendTo('Белорецк(Производство)')
                    if (sendFrom === 'Белорецк(Производство)') {
                        setLocError('Локации не могут совпадать')
                    }
                    const element1 = document.getElementById('span-four')!
                    const element2 = document.getElementById('span-five')!
                    const element3 = document.getElementById('span-six')!
                    element3.classList.add('item-clicked')
                    element2.classList.remove('item-clicked')
                    element1.classList.remove('item-clicked')
                }}><label>Производство</label></span>
            </div>
            <div className='send-page-input-container'>
                <div className='send-page-input plate'>
                    {/*<label htmlFor="plates">Номер машины</label>*/}
                    {/*<input type="text" id='plates' className='car-plate-input' placeholder='А123БВ' maxLength={6} value={plates}*/}
                    {/*       onChange={event => setPlates(event.target.value.replace(/([^A-Za-z0-9А-Яа-яёË])+/g, ''))}/>*/}
                    <div className='car-plate-div'>
                        <div className='car-plate-left'>
                            <input type="text" placeholder='А123БВ' maxLength={6} value={plates}
                                   onChange={event => setPlates(event.target.value.replace(/([^A-Za-z0-9А-Яа-яёË])+/g, ''))}/>
                        </div>
                        <div className='car-plate-right'>
                            <input type="text" placeholder='777' maxLength={4} value={region}
                                   onChange={event => setRegion(event.target.value.replace(/([^0-9])+/g ,''))}/>
                            <div className='lower-plate-part'>
                                <span>RUS</span>
                                <div className='flag-container'>
                                    <div className='rus-flag'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='send-page-input'>
                    {/*<label htmlFor="ids">Позиции</label>*/}
                    <input type="text" id='ids' placeholder=' Введите ID позиций' required value={ids}
                           onChange={event => setIds(event.target.value.replace(/[^,1234567890]+/g, ''))}
                           onKeyDown={event => {
                               if (event.key === 'Enter') {
                                   findIds()
                               }
                           }}/>
                </div>
                <div className='send-page-input find-button'>
                    {/*<label htmlFor=""></label>*/}
                    <button className='send-page-input-button' onClick={findIds}>Добавить</button>
                </div>
            </div>
            {error && <h2 style={{color: 'red'}}>{error}</h2>}
            {locError && <h2 style={{color: 'red'}}>{locError}</h2>}
            {cardError && <h2 style={{color: 'red'}}>{cardError}</h2>}
            {successRequest && <h2 style={{color: 'green'}}>Позиции успешно отправлены</h2>}
            <div className='search-cards' style={{width: '100%', marginTop: '20px'}}>
                {!error && cards.length !== 0 &&
                    <CardView cards={cards}/>
                }
            </div>
            <button type='button' className='send-page-confirm-button' onClick={sendPositions}
                    disabled={sendTo === sendFrom || sendTo === '' || sendFrom === '' || cardError !== '' || cards.length === 0 || successRequest}>
                Отправить
            </button>
        </div>
    )
}