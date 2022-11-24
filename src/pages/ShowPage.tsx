import React, {useState} from "react";
import '../css/ShowPage.css'
import {ErrorMessage} from '../components/ErrorMessage'
import {Loader} from "../components/Loader";
import {useModels} from "../hooks/models";
import {TableRow} from "../components/TableRow";
import {Card} from "../components/Card";
import {FilterPanelCheckbox} from "../components/FilterPanelCheckbox";
import {FilterPanelMultislider} from "../components/FilterPanelMultislider";
import {ResponseBody} from "../interfaces/models";

export function ShowPage(response: ResponseBody) {
    const {loading, error, models, cards} = useModels(response)
    const [cardView, setCardView] = useState(false)
    // const [filterActive, setFilterActive] = useState(false)
    // const [markArray, setMarkArray] = useState<string[]>([])
    // const [packArray, setPackArray] = useState<string[]>([])
    // const [isChecked, setIsChecked] = useState(false)

    // const inputChangeHandlerMarks = (event: { target: { checked: any; value: string; }; }) => {
    //     let updatedList = [...markArray]
    //     setIsChecked(event.target.checked)
    //     if (event.target.checked) {
    //         console.log(updatedList)
    //         updatedList = [...markArray, event.target.value]
    //         console.log(updatedList)
    //     } else {
    //         console.log(updatedList)
    //         updatedList.splice(markArray.indexOf(event.target.value), 1)
    //         console.log(updatedList)
    //     }
    //     setMarkArray(updatedList)
    // }

    // const inputChangeHandlerPacks = (event: { target: { checked: any; value: string; }; }) => {
    //     let updatedList = [...packArray]
    //     setIsChecked(event.target.checked)
    //     if (event.target.checked) {
    //         console.log(updatedList)
    //         updatedList = [...packArray, event.target.value]
    //         console.log(updatedList)
    //     } else {
    //         console.log(updatedList)
    //         updatedList.splice(packArray.indexOf(event.target.value), 1)
    //         console.log(updatedList)
    //     }
    //     setPackArray(updatedList)
    // }

    // function checkFilter() {
    //
    // }

    return (
        <>
            {loading && <Loader></Loader>}
            {error && <ErrorMessage error={error}></ErrorMessage>}
            {!loading &&
                <div>
                    <div className='switchbar'>
                        <p>Переключить на карточный вид:</p>
                        <label className='switch'>
                            <input type='checkbox' onChange={() => setCardView(!cardView)}/>
                            <span className='slider round'></span>
                        </label>
                    </div>
                    <div className='filter-panel'>
                        <h3>Марки:</h3>
                        {/*{marks.map((mark, i) => <FilterPanelCheckbox item={mark} key={i}/>)}*/}
                        <h3 className='diameter'>Диаметр:</h3>
                        <div className='multislider'>
                            <FilterPanelMultislider/>
                        </div>
                        <h3>Упаковка:</h3>
                        {/*{packs.map((pack, i) => <FilterPanelCheckbox item={pack} key={i}/>)}*/}
                    </div>
                    {!cardView &&
                        <table>
                            <thead>
                            <tr>
                                <th>Марка</th>
                                <th>Диаметр</th>
                                <th>Упаковка</th>
                                <th>Солнечногорск</th>
                                <th>Белорецк(Склад)</th>
                                <th>Белорецк(Произ-во)</th>
                            </tr>
                            </thead>
                            <tbody>
                                {models
                                    // .filter((model) => checked.some(check => model.mark.includes(check)))
                                // .filter((model, index) => model.mark.includes())
                                // .filter((model, index) => model.s)
                                // .sort((a, b) => Number(b.diameter) - Number(a.diameter))
                                .map((model, i) => <TableRow model={model} key={i}/>)}
                            </tbody>
                        </table>}
                    {cardView &&
                        <div className='card-container'>
                            {cards.map((card, i) => <Card card={card} key={i}/>)}
                        </div>
                    }
                </div>}
        </>

    )
}