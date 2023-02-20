import axios from "axios";
import {BACKEND_URL} from "../ConstConfig";
import {useLoaderData} from "react-router-dom";
import {CardView} from "./CardView";
import '../css/MeltSearchWeights.css'
import {useState} from "react";

//@ts-ignore
export async function weightLoader({params}) {
    const part = params.part.replace('+', '/')
    console.log(part)
    const response = await axios.post(BACKEND_URL + '/api/v1/search/weight', {
        mark: params.mark,
        diameter: Number(params.diameter),
        packing: params.packing,
        part: part,
        plav: params.plav
    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    const weight = response.data
    return {weight}
}

export function MeltSearchWeights() {
    //@ts-ignore
    const {weight} = useLoaderData()

    const [state, setState] = useState('sol')

    return (
        <div style={{marginTop: '90px'}}>
            <div className='triple-switch-container'>
                <div className='triple-switch'>
                    <span id='span-one' className='item-notclicked' onClick={() => {
                        setState('bel')
                        const element1 = document.getElementById('span-one')!
                        const element2 = document.getElementById('span-two')!
                        const element3 = document.getElementById('span-three')!
                        element1.classList.add('item-clicked')
                        element2.classList.remove('item-clicked')
                        element3.classList.remove('item-clicked')
                    }}><label>Белорецк</label></span>
                    <span id='span-two' className='item-notclicked item-clicked' onClick={() => {
                        setState('sol')
                        const element1 = document.getElementById('span-one')!
                        const element2 = document.getElementById('span-two')!
                        const element3 = document.getElementById('span-three')!
                        element2.classList.add('item-clicked')
                        element1.classList.remove('item-clicked')
                        element3.classList.remove('item-clicked')
                    }}><label>Солнечногорск</label></span>
                    <span id='span-three' className='item-notclicked' onClick={() => {
                        setState('manu')
                        const element1 = document.getElementById('span-one')!
                        const element2 = document.getElementById('span-two')!
                        const element3 = document.getElementById('span-three')!
                        element3.classList.add('item-clicked')
                        element2.classList.remove('item-clicked')
                        element1.classList.remove('item-clicked')
                    }}><label>Производство</label></span>
                </div>
            </div>
            <div className='search-cards'>
                {state === 'bel' &&
                    <div>
                        <h2>Белорецк</h2>
                        {weight.belSklad.length !== 0 ? <CardView cards={weight.belSklad}/>
                            : <h4 style={{color: 'rgb(253, 185, 0)'}}>Нет позиций в данной категории</h4>}
                    </div>
                }
                {state === 'sol' &&
                    <div>
                        <h2>Солнечногорск</h2>
                        {weight.solnechnogorsk.length !== 0 ? <CardView cards={weight.solnechnogorsk}/>
                            : <h4 style={{color: 'rgb(253, 185, 0)'}}>Нет позиций в данной категории</h4>}
                    </div>
                }
                {state === 'manu' &&
                    <div>
                        <h2>Производство</h2>
                        {weight.manufacture.length !== 0 ? <CardView cards={weight.manufacture}/>
                            : <h4 style={{color: 'rgb(253, 185, 0)'}}>Нет позиций в данной категории</h4>}
                    </div>
                }
            </div>
        </div>
    )
}