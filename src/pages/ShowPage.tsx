import React, {useState} from "react";
import '../css/ShowPage.css'
import {ErrorMessage} from '../components/ErrorMessage'
import {Loader} from "../components/Loader";
import {useModels} from "../hooks/useModels";
import {FilterPanel} from "../components/FilterPanel";
import {TableView} from "../components/TableView";
import {CardView} from "../components/CardView";

interface ShowPageProps {
    token: string
}

export function ShowPage({token}: ShowPageProps) {
    const {loading, error, models, cards, marks, packs, diameter} = useModels(token)
    const [cardView, setCardView] = useState(false)
    const [selectedMarks, setSelectedMarks] = useState<string[]>([])
    const [selectedPacks, setSelectedPacks] = useState<string[]>([])
    const [selectedDiameterLeft, setSelectedDiameterLeft] = useState(0.3)
    const [selectedDiameterRight, setSelectedDiameterRight] = useState(20)

    function packsHandler(item: string[]) {
        setSelectedPacks(item)
    }

    function marksHandler(item: string[]) {
        setSelectedMarks(item)
    }

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
                    <FilterPanel marks={marks} packs={packs} selectedMarks={selectedMarks} selectedPacks={selectedPacks}
                                 marksHandler={marksHandler} packsHandler={packsHandler} leftDiameter={diameter.min}
                                 rightDiameter={diameter.max}
                                 selectedDiameterLeft={selectedDiameterLeft}
                                 selectedDiameterRight={selectedDiameterRight}
                                 leftDiameterHandler={setSelectedDiameterLeft}
                                 rightDiameterHandler={setSelectedDiameterRight}
                    />
                    {!cardView &&
                        <TableView models={models} selectedMarks={selectedMarks} selectedPacks={selectedPacks}
                                   selectedDiameterLeft={selectedDiameterLeft}
                                   selectedDiameterRight={selectedDiameterRight}
                        />
                    }
                    {cardView &&
                        <CardView cards={cards}/>
                    }
                </div>
            }
        </>
    )
}