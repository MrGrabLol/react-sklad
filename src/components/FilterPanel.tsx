import React from "react";
import {FilterPanelCheckbox} from "./FilterPanelCheckbox";
import {FilterPanelMultislider} from "./FilterPanelMultislider";
import '../css/FilterPanel.css'
// import {Diameter} from "../interfaces/models";

interface FilterPanelProps {
    marks: string[],
    packs: string[],
    selectedMarks: string[],
    selectedPacks: string[],
    marksHandler: (item: string[]) => void,
    packsHandler: (item: string[]) => void,
    leftDiameter: number,
    rightDiameter: number,
    selectedDiameterLeft: number,
    selectedDiameterRight: number
    leftDiameterHandler: (item: number) => void
    rightDiameterHandler: (item: number) => void
}

export function FilterPanel({marks, packs, selectedMarks, selectedPacks, marksHandler, packsHandler, leftDiameter, rightDiameter, selectedDiameterLeft, selectedDiameterRight, leftDiameterHandler, rightDiameterHandler}: FilterPanelProps) {
    return (
        <div className="filter-panel">
                <div>
                    <h3>Марки:</h3>
                    {marks.map((mark, i) => <FilterPanelCheckbox item={mark} selectedItem={selectedMarks} selectedHandler={marksHandler} key={i}/>)}
                    <h3 className='diameter'>Диаметр:</h3>
                    <div className='multislider'>
                        <FilterPanelMultislider leftDiameter={leftDiameter} rightDiameter={rightDiameter} selectedDiameterLeft={selectedDiameterLeft} selectedDiameterRight={selectedDiameterRight}
                                                leftDiameterHandler={leftDiameterHandler} rightDiameterHandler={rightDiameterHandler}
                        />
                    </div>
                    <h3>Упаковка:</h3>
                    {packs.map((pack, i) => <FilterPanelCheckbox item={pack} selectedHandler={packsHandler} selectedItem={selectedPacks} key={i}/>)}
                </div>
        </div>
    )
}