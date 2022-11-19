import React, {useState} from "react";
import '../css/ShowPage.css'
import {ErrorMessage} from '../components/ErrorMessage'
import {Loader} from "../components/Loader";
import {useModels} from "../hooks/models";
import {TableRow} from "../components/TableRow";
import {Card} from "../components/Card";
import {FilterPanelCheckbox} from "../components/FilterPanelCheckbox";

export function ShowPage() {
    const {loading, error, models, cards, marks} = useModels()
    const [cardView, setCardView] = useState(false)

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
                        {marks.map((mark, i) => <FilterPanelCheckbox mark={mark} key={i}/>)}
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