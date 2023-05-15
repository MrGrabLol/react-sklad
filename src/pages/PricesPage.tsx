import '../css/PricesPage.css'
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import {IAlloy, IComposition, IReceivedAlloy} from "../interfaces/exportedInterfaces";

export function PricesPage() {

    const [chosenWire, setChosenWire] = useState<string>('')
    const [chosenMaterial, setChosenMaterial] = useState<string>('')
    const [chosenAlloy, setChosenAlloy] = useState<IAlloy[]>([])
    const [chosenDiameter, setChosenDiameter] = useState<string>('')
    const [result, setResult] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [receivedAlloys, setReceivedAlloys] = useState<IReceivedAlloy[]>([])
    const [alloyName, setAlloyName] = useState<string>('')
    const [chosenId, setChosenId] = useState<number>(-1)
    const [requestError, setRequestError] = useState<string>('')

    const [chosenWireAdmin, setChosenWireAdmin] = useState<string>('')
    const [chosenMaterialAdmin, setChosenMaterialAdmin] = useState<string>('')
    const [chosenAlloyNameAdmin, setChosenAlloyNameAdmin] = useState<string>('')
    const [diameterMin, setDiameterMin] = useState<number>()
    const [diameterMax, setDiameterMax] = useState<number>()
    const [loss, setLoss] = useState<number>()
    const [expenses, setExpenses] = useState<number>()
    const [margin, setMargin] = useState<number>()
    // const [composition, setComposition] = useState<IComposition[]>([])
    const [alComposition, setAlComposition] = useState<number>(0)
    const [niComposition, setNiComposition] = useState<number>(0)
    const [feComposition, setFeComposition] = useState<number>(0)
    const [cuComposition, setCuComposition] = useState<number>(0)

    const [adminError, setAdminError] = useState<string>('')

    // const alWires = [
    //     'Al1',
    //     'Al2',
    //     'Al3',
    //     'Al4',
    //     'Al5'
    // ]
    //
    // const niWires = [
    //     'Ni1',
    //     'Ni2',
    //     'Ni3',
    //     'Ni4',
    //     'Ni5'
    // ]

    // const cuWires = [
    //     'Cu1',
    //     'Cu2',
    //     'Cu3',
    //     'Cu4',
    //     'Cu5'
    // ]

    // const niCuWires = [
    //     'NiCu1',
    //     'NiCu2',
    //     'NiCu3',
    //     'NiCu4',
    //     'NiCu5'
    // ]
    //
    // const bronzeWires = [
    //     'Bronze1',
    //     'Bronze2',
    //     'Bronze3',
    //     'Bronze4',
    //     'Bronze5'
    // ]

    // const alMin: number = 1
    // const alMax: number = 3
    //
    // const niMin: number = 0.5
    // const niMax: number = 1.6
    //
    // const cuMin: number = 2
    // const cuMax: number = 4.5
    //
    // const niCuMin: number = 1
    // const niCuMax: number = 3.4
    //
    // const bronzeMin: number = 0.3
    // const bronzeMax: number = 4.7

    // const checkMin = () => {
    //     if (chosenMaterial === 'Al') {
    //         return alMin
    //     } else if (chosenMaterial === 'Ni') {
    //         return niMin
    //     } else if (chosenMaterial === 'Cu') {
    //         return cuMin
    //     } else if (chosenMaterial === 'NiCu') {
    //         return niCuMin
    //     } else {
    //         return bronzeMin
    //     }
    // }
    //
    // const checkMax = () => {
    //     if (chosenMaterial === 'Al') {
    //         return alMax
    //     } else if (chosenMaterial === 'Ni') {
    //         return niMax
    //     } else if (chosenMaterial === 'Cu') {
    //         return cuMax
    //     } else if (chosenMaterial === 'NiCu') {
    //         return niCuMax
    //     } else {
    //         return bronzeMax
    //     }
    // }

    async function sendRequest(material: string) {
        setError('')
        try {
            const response = await axios.get(BACKEND_URL + '/api/v1/alloy', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                params: {
                    type: chosenWire,
                    element: material
                }
            })
            setReceivedAlloys(response.data)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function sendId() {
        setRequestError('')
        try {
            const response = await axios.get(BACKEND_URL + '/api/v1/alloy/' + chosenId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setResult(response.data.price)
        } catch (e: unknown) {
            const error = e as AxiosError
            setRequestError(error.message)
        }
    }

    async function sendAdminRequest() {
        setAdminError('')
        let composition: IComposition[] = []
        if (feComposition !== 0) {
            composition = [...composition, {element: 'Fe', value: feComposition}]
        }
        if (niComposition !== 0) {
            composition = [...composition, {element: 'Ni', value: niComposition}]
        }
        if (cuComposition !== 0) {
            composition = [...composition, {element: 'Cu', value: cuComposition}]
        }
        if (alComposition !== 0) {
            composition = [...composition, {element: 'Al', value: alComposition}]
        }
        if (alComposition + feComposition + cuComposition + niComposition !== 1) {
            setAdminError('Сумма состава не равна 1')
        } else {
            try {
                const response = await axios.post(BACKEND_URL + '/api/v1/alloy', {
                    material: chosenWireAdmin,
                    element: chosenMaterialAdmin,
                    name: chosenAlloyNameAdmin,
                    diameterMin: diameterMin,
                    diameterMax: diameterMax,
                    loss: loss,
                    expenses: expenses,
                    margin: margin,
                    composition: composition
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                if (response.status === 200) {
                    window.location.reload()
                }
            } catch (e: unknown) {
                const error = e as AxiosError
                setAdminError(error.message)
            }
        }
    }

    //add input

    // const inputArr = [
    //     {
    //         type: "text",
    //         id: 1,
    //         value: ""
    //     }
    // ];
    //
    // const [arr, setArr] = useState(inputArr);
    //
    // const addInput = () => {
    //     // @ts-ignore
    //     setArr(s => {
    //         return [
    //             ...s,
    //             {
    //                 type: "text",
    //                 value: ""
    //             }
    //         ];
    //     });
    // };
    //
    // const handleChange = (event: { preventDefault: () => void; target: { id: any; value: string; }; }) => {
    //     event.preventDefault();
    //
    //     const index = event.target.id;
    //     setArr(s => {
    //         const newArr = s.slice();
    //         newArr[index].value = event.target.value;
    //
    //         return newArr;
    //     });
    // };


    return (
        <div className='prices-container'>
            <div className='choice-description'>
                Вы выбрали: {chosenWire && <span><strong>{chosenWire}</strong></span>}
                {chosenMaterial && <span> из <strong>{chosenMaterial}</strong></span>}
                {chosenAlloy.length >= 1 && <span>, сплав <strong>{alloyName}</strong></span>}
                {chosenDiameter && <span> диаметром <strong>{chosenDiameter}</strong></span>}
            </div>
            {error && <h2 style={{color: 'red'}}>Не удалось загрузить сплавы</h2>}
            <div className='price-blocks'>
                <div className='price-block wire-block'>
                    <span id='wire1' className='price-unit' onClick={() => {
                        setChosenWire('WIRE')
                        document.getElementById('wire1')!.classList.add('chosen')
                        document.getElementById('wire2')!.classList.remove('chosen')
                        document.getElementById('wire3')!.classList.remove('chosen')
                        document.getElementById('arrow-block1')!.style.width = '4%'
                        document.getElementById('arrow-block1')!.style.visibility = 'visible'
                        document.getElementById('block2')!.style.width = '22%'
                        document.getElementById('block2')!.style.visibility = 'visible'
                    }}>Проволока</span>
                    <span id='wire2' className='price-unit' onClick={() => {
                        setChosenWire('SHEET')
                        document.getElementById('wire1')!.classList.remove('chosen')
                        document.getElementById('wire2')!.classList.add('chosen')
                        document.getElementById('wire3')!.classList.remove('chosen')
                        document.getElementById('arrow-block1')!.style.width = '4%'
                        document.getElementById('arrow-block1')!.style.visibility = 'visible'
                        document.getElementById('block2')!.style.width = '22%'
                        document.getElementById('block2')!.style.visibility = 'visible'
                    }}>Лист</span>
                    <span id='wire3' className='price-unit' onClick={() => {
                        setChosenWire('CIRCLE')
                        document.getElementById('wire1')!.classList.remove('chosen')
                        document.getElementById('wire2')!.classList.remove('chosen')
                        document.getElementById('wire3')!.classList.add('chosen')
                        document.getElementById('arrow-block1')!.style.width = '4%'
                        document.getElementById('arrow-block1')!.style.visibility = 'visible'
                        document.getElementById('block2')!.style.width = '22%'
                        document.getElementById('block2')!.style.visibility = 'visible'
                    }}>Круг</span>
                </div>
                <div id='arrow-block1' className='arrow-block'>
                    <span>&#8594;</span>
                </div>
                <div id='block2' className='price-block'>
                        <span id='mat1' className='price-unit' onClick={() => {
                            setChosenMaterial('AL')
                            setChosenAlloy([])
                            setChosenDiameter('')
                            setResult('')
                            document.getElementById('mat1')!.classList.add('chosen')
                            document.getElementById('mat2')!.classList.remove('chosen')
                            document.getElementById('mat3')!.classList.remove('chosen')
                            document.getElementById('mat4')!.classList.remove('chosen')
                            document.getElementById('mat5')!.classList.remove('chosen')
                            document.getElementById('arrow-block2')!.style.width = '4%'
                            document.getElementById('arrow-block2')!.style.visibility = 'visible'
                            document.getElementById('block3')!.style.width = '22%'
                            document.getElementById('block3')!.style.visibility = 'visible'
                            sendRequest('AL')
                        }}>Al</span>
                    <span id='mat2' className='price-unit' onClick={() => {
                        setChosenMaterial('NI')
                        setChosenAlloy([])
                        setChosenDiameter('')
                        setResult('')
                        document.getElementById('mat1')!.classList.remove('chosen')
                        document.getElementById('mat2')!.classList.add('chosen')
                        document.getElementById('mat3')!.classList.remove('chosen')
                        document.getElementById('mat4')!.classList.remove('chosen')
                        document.getElementById('mat5')!.classList.remove('chosen')
                        document.getElementById('arrow-block2')!.style.width = '4%'
                        document.getElementById('arrow-block2')!.style.visibility = 'visible'
                        document.getElementById('block3')!.style.width = '22%'
                        document.getElementById('block3')!.style.visibility = 'visible'
                        sendRequest('NI')
                    }}>Ni</span>
                    <span id='mat3' className='price-unit' onClick={() => {
                        setChosenMaterial('CU')
                        setChosenAlloy([])
                        setChosenDiameter('')
                        setResult('')
                        document.getElementById('mat1')!.classList.remove('chosen')
                        document.getElementById('mat2')!.classList.remove('chosen')
                        document.getElementById('mat3')!.classList.add('chosen')
                        document.getElementById('mat4')!.classList.remove('chosen')
                        document.getElementById('mat5')!.classList.remove('chosen')
                        document.getElementById('arrow-block2')!.style.width = '4%'
                        document.getElementById('arrow-block2')!.style.visibility = 'visible'
                        document.getElementById('block3')!.style.width = '22%'
                        document.getElementById('block3')!.style.visibility = 'visible'
                        sendRequest('CU')
                    }}>Cu</span>
                    <span id='mat4' className='price-unit' onClick={() => {
                        setChosenMaterial('NI_CR')
                        setChosenAlloy([])
                        setChosenDiameter('')
                        setResult('')
                        document.getElementById('mat1')!.classList.remove('chosen')
                        document.getElementById('mat2')!.classList.remove('chosen')
                        document.getElementById('mat3')!.classList.remove('chosen')
                        document.getElementById('mat4')!.classList.add('chosen')
                        document.getElementById('mat5')!.classList.remove('chosen')
                        document.getElementById('arrow-block2')!.style.width = '4%'
                        document.getElementById('arrow-block2')!.style.visibility = 'visible'
                        document.getElementById('block3')!.style.width = '22%'
                        document.getElementById('block3')!.style.visibility = 'visible'
                        sendRequest('NI_CR')
                    }}>NiCu</span>
                    <span id='mat5' className='price-unit' onClick={() => {
                        setChosenMaterial('BRONZE')
                        setChosenAlloy([])
                        setChosenDiameter('')
                        setResult('')
                        document.getElementById('mat1')!.classList.remove('chosen')
                        document.getElementById('mat2')!.classList.remove('chosen')
                        document.getElementById('mat3')!.classList.remove('chosen')
                        document.getElementById('mat4')!.classList.remove('chosen')
                        document.getElementById('mat5')!.classList.add('chosen')
                        document.getElementById('arrow-block2')!.style.width = '4%'
                        document.getElementById('arrow-block2')!.style.visibility = 'visible'
                        document.getElementById('block3')!.style.width = '22%'
                        document.getElementById('block3')!.style.visibility = 'visible'
                        sendRequest('BRONZE')
                    }}>Bronze</span>
                </div>
                <div id='arrow-block2' className='arrow-block'>
                    <span>&#8594;</span>
                </div>
                <div id='block3' className='price-block'>
                    {receivedAlloys.map((alloy, index) => <span id={'span-alloy' + index} className='price-unit alloy-selector' onClick={() => {
                        setChosenAlloy(alloy.alloys)
                        setAlloyName(alloy.name)
                        setChosenDiameter('')
                        setResult('')
                        document.querySelectorAll('.alloy-selector').forEach(el => el.classList.remove('chosen'))
                        document.getElementById('span-alloy' + index)!.classList.add('chosen')
                        document.getElementById('arrow-block3')!.style.width = '4%'
                        document.getElementById('arrow-block3')!.style.visibility = 'visible'
                        document.getElementById('block4')!.style.width = '22%'
                        document.getElementById('block4')!.style.visibility = 'visible'
                    }}>{alloy.name}</span>)}
                </div>
                <div id='arrow-block3' className='arrow-block'>
                    <span>&#8594;</span>
                </div>
                <div id='block4' className='price-block'>
                    {/*<span>Выбранный диаметр: {chosenDiameter}</span>*/}
                    {/*<input className='price-input' type="range" min={checkMin()} max={checkMax()} value={chosenDiameter}*/}
                    {/*       onChange={event => setChosenDiameter(event.target.value)} step='0.01'/>*/}
                    {chosenAlloy.map((alloy, index) => <span id={'span-diameter' + index} className='price-unit diameter-alloy' onClick={() => {
                        setChosenId(alloy.id)
                        setChosenDiameter(alloy.minDiameter + ' - ' + alloy.maxDiameter)
                        setResult('')
                        document.querySelectorAll('.diameter-alloy').forEach(diam => diam.classList.remove('chosen'))
                        document.getElementById('span-diameter' + index)!.classList.add('chosen')
                    }}>
                        {alloy.minDiameter} - {alloy.maxDiameter}
                    </span>)}
                </div>
            </div>
            {
                chosenWire && chosenMaterial && chosenAlloy && chosenDiameter &&
                <div className='count-btn'>
                    <button onClick={sendId}>Посчитать</button>
                </div>
            }
            {requestError && <h2 style={{color: 'red'}}>Ошибка получения РРЦ</h2>}
            {
                result &&
                <h2>РРЦ: {result}</h2>
            }
            {adminError && <h2 style={{color: 'red'}}>{adminError}</h2>}
            {
                localStorage.getItem('roles')?.includes('ADMIN') &&
                <div className='price-blocks' style={{marginTop: '40px'}}>
                    <div className='price-block wire-block'>
                        <span id='wire1a' className='price-unit' onClick={() => {
                            setChosenWireAdmin('WIRE')
                            document.getElementById('wire1a')!.classList.add('chosen')
                            document.getElementById('wire2a')!.classList.remove('chosen')
                            document.getElementById('wire3a')!.classList.remove('chosen')
                            document.getElementById('arrow-block1a')!.style.width = '4%'
                            document.getElementById('arrow-block1a')!.style.visibility = 'visible'
                            document.getElementById('block2a')!.style.width = '22%'
                            document.getElementById('block2a')!.style.visibility = 'visible'
                        }}>Проволока</span>
                        <span id='wire2a' className='price-unit' onClick={() => {
                            setChosenWireAdmin('SHEET')
                            document.getElementById('wire1a')!.classList.remove('chosen')
                            document.getElementById('wire2a')!.classList.add('chosen')
                            document.getElementById('wire3a')!.classList.remove('chosen')
                            document.getElementById('arrow-block1a')!.style.width = '4%'
                            document.getElementById('arrow-block1a')!.style.visibility = 'visible'
                            document.getElementById('block2a')!.style.width = '22%'
                            document.getElementById('block2a')!.style.visibility = 'visible'
                        }}>Лист</span>
                        <span id='wire3a' className='price-unit' onClick={() => {
                            setChosenWireAdmin('CIRCLE')
                            document.getElementById('wire1a')!.classList.remove('chosen')
                            document.getElementById('wire2a')!.classList.remove('chosen')
                            document.getElementById('wire3a')!.classList.add('chosen')
                            document.getElementById('arrow-block1a')!.style.width = '4%'
                            document.getElementById('arrow-block1a')!.style.visibility = 'visible'
                            document.getElementById('block2a')!.style.width = '22%'
                            document.getElementById('block2a')!.style.visibility = 'visible'
                        }}>Круг</span>
                    </div>
                    <div id='arrow-block1a' className='arrow-block'>
                        <span>&#8594;</span>
                    </div>
                    <div id='block2a' className='price-block'>
                        <span id='mat1a' className='price-unit' onClick={() => {
                            setChosenMaterialAdmin('AL')
                            document.getElementById('mat1a')!.classList.add('chosen')
                            document.getElementById('mat2a')!.classList.remove('chosen')
                            document.getElementById('mat3a')!.classList.remove('chosen')
                            document.getElementById('mat4a')!.classList.remove('chosen')
                            document.getElementById('mat5a')!.classList.remove('chosen')
                            document.getElementById('arrow-block2a')!.style.width = '4%'
                            document.getElementById('arrow-block2a')!.style.visibility = 'visible'
                            document.getElementById('block3a')!.style.width = '22%'
                            document.getElementById('block3a')!.style.visibility = 'visible'
                            document.getElementById('arrow-block3a')!.style.width = '4%'
                            document.getElementById('arrow-block3a')!.style.visibility = 'visible'
                            document.getElementById('block4a')!.style.width = '22%'
                            document.getElementById('block4a')!.style.visibility = 'visible'
                        }}>Al</span>
                        <span id='mat2a' className='price-unit' onClick={() => {
                            setChosenMaterialAdmin('NI')
                            document.getElementById('mat1a')!.classList.remove('chosen')
                            document.getElementById('mat2a')!.classList.add('chosen')
                            document.getElementById('mat3a')!.classList.remove('chosen')
                            document.getElementById('mat4a')!.classList.remove('chosen')
                            document.getElementById('mat5a')!.classList.remove('chosen')
                            document.getElementById('arrow-block2a')!.style.width = '4%'
                            document.getElementById('arrow-block2a')!.style.visibility = 'visible'
                            document.getElementById('block3a')!.style.width = '22%'
                            document.getElementById('block3a')!.style.visibility = 'visible'
                            document.getElementById('arrow-block3a')!.style.width = '4%'
                            document.getElementById('arrow-block3a')!.style.visibility = 'visible'
                            document.getElementById('block4a')!.style.width = '22%'
                            document.getElementById('block4a')!.style.visibility = 'visible'
                        }}>Ni</span>
                        <span id='mat3a' className='price-unit' onClick={() => {
                            setChosenMaterialAdmin('CU')
                            document.getElementById('mat1a')!.classList.remove('chosen')
                            document.getElementById('mat2a')!.classList.remove('chosen')
                            document.getElementById('mat3a')!.classList.add('chosen')
                            document.getElementById('mat4a')!.classList.remove('chosen')
                            document.getElementById('mat5a')!.classList.remove('chosen')
                            document.getElementById('arrow-block2a')!.style.width = '4%'
                            document.getElementById('arrow-block2a')!.style.visibility = 'visible'
                            document.getElementById('block3a')!.style.width = '22%'
                            document.getElementById('block3a')!.style.visibility = 'visible'
                            document.getElementById('arrow-block3a')!.style.width = '4%'
                            document.getElementById('arrow-block3a')!.style.visibility = 'visible'
                            document.getElementById('block4a')!.style.width = '22%'
                            document.getElementById('block4a')!.style.visibility = 'visible'
                        }}>Cu</span>
                        <span id='mat4a' className='price-unit' onClick={() => {
                            setChosenMaterialAdmin('NI_CR')
                            document.getElementById('mat1a')!.classList.remove('chosen')
                            document.getElementById('mat2a')!.classList.remove('chosen')
                            document.getElementById('mat3a')!.classList.remove('chosen')
                            document.getElementById('mat4a')!.classList.add('chosen')
                            document.getElementById('mat5a')!.classList.remove('chosen')
                            document.getElementById('arrow-block2a')!.style.width = '4%'
                            document.getElementById('arrow-block2a')!.style.visibility = 'visible'
                            document.getElementById('block3a')!.style.width = '22%'
                            document.getElementById('block3a')!.style.visibility = 'visible'
                            document.getElementById('arrow-block3a')!.style.width = '4%'
                            document.getElementById('arrow-block3a')!.style.visibility = 'visible'
                            document.getElementById('block4a')!.style.width = '22%'
                            document.getElementById('block4a')!.style.visibility = 'visible'
                        }}>NiCu</span>
                        <span id='mat5a' className='price-unit' onClick={() => {
                            setChosenMaterialAdmin('BRONZE')
                            document.getElementById('mat1a')!.classList.remove('chosen')
                            document.getElementById('mat2a')!.classList.remove('chosen')
                            document.getElementById('mat3a')!.classList.remove('chosen')
                            document.getElementById('mat4a')!.classList.remove('chosen')
                            document.getElementById('mat5a')!.classList.add('chosen')
                            document.getElementById('arrow-block2a')!.style.width = '4%'
                            document.getElementById('arrow-block2a')!.style.visibility = 'visible'
                            document.getElementById('block3a')!.style.width = '22%'
                            document.getElementById('block3a')!.style.visibility = 'visible'
                            document.getElementById('arrow-block3a')!.style.width = '4%'
                            document.getElementById('arrow-block3a')!.style.visibility = 'visible'
                            document.getElementById('block4a')!.style.width = '22%'
                            document.getElementById('block4a')!.style.visibility = 'visible'
                        }}>Bronze</span>
                    </div>
                    <div id='arrow-block2a' className='arrow-block'>
                        <span>&#8594;</span>
                    </div>
                    <div id='block3a' className='price-block'>
                        <input type="text" placeholder='Введите название сплава' value={chosenAlloyNameAdmin} onChange={event => setChosenAlloyNameAdmin(event.target.value)}/>
                        <input type="text" placeholder='Мин. диаметр' value={diameterMin} onChange={event => setDiameterMin(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                        <input type="text" placeholder='Макс. диаметр' value={diameterMax} onChange={event => setDiameterMax(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                        <input type="text" placeholder='Потери' value={loss} onChange={event => setLoss(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                        <input type="text" placeholder='Затраты' value={expenses} onChange={event => setExpenses(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                        <input type="text" placeholder='Маржа' value={margin} onChange={event => setMargin(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                    </div>
                    <div id='arrow-block3a' className='arrow-block'>
                        <span>&#8594;</span>
                    </div>
                    <div id='block4a' className='price-block'>
                        <p>Состав: </p>
                        <input type="text" placeholder='Al' onChange={event => setAlComposition(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                        <input type="text" placeholder='Ni' onChange={event => setNiComposition(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                        <input type="text" placeholder='Fe' onChange={event => setFeComposition(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                        <input type="text" placeholder='Cu' onChange={event => setCuComposition(Number(event.target.value.replace(/[^.1234567890]+/g, '')))}/>
                        {/*<button type='button' onClick={addInput}>Добавить поле</button>*/}
                        {/*{arr.map((item, i) => {*/}
                        {/*    return (*/}
                        {/*        <input*/}
                        {/*            onChange={handleChange}*/}
                        {/*            value={item.value}*/}
                        {/*            key={i}*/}
                        {/*            type={item.type}*/}
                        {/*        />*/}
                        {/*    );*/}
                        {/*})}*/}
                    </div>
                </div>
            }
            {
                localStorage.getItem('roles')!.includes('ADMIN') && chosenAlloyNameAdmin && chosenMaterialAdmin && chosenWireAdmin && loss && expenses && margin && diameterMax && diameterMin &&
                <button type='button' className='price-admin-btn' onClick={sendAdminRequest}>Отправить сплав</button>
            }

        </div>

    )
}