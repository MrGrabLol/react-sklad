import React from "react";
import {FilterPanelCheckbox} from "./FilterPanelCheckbox";
import {FilterPanelMultislider} from "./FilterPanelMultislider";
import '../css/FilterPanel.css'

interface FilterPanelProps {
    marks: string[],
    packs: string[],
    selectedMarks: string[],
    selectedPacks: string[],
    marksHandler: (item: string[]) => void
    packsHandler: (item: string[]) => void
}

export function FilterPanel({marks, packs, selectedMarks, selectedPacks, marksHandler, packsHandler}: FilterPanelProps) {
    return (
        <div className="filter-panel">
                <div>
                    <h3>Марки:</h3>
                    {marks.map((mark, i) => <FilterPanelCheckbox item={mark} selectedItem={selectedMarks} selectedHandler={marksHandler} key={i}/>)}
                    <h3 className='diameter'>Диаметр:</h3>
                    <div className='multislider'>
                        <FilterPanelMultislider/>
                    </div>
                    <h3>Упаковка:</h3>
                    {packs.map((pack, i) => <FilterPanelCheckbox item={pack} selectedHandler={packsHandler} selectedItem={selectedPacks} key={i}/>)}
                </div>
        </div>
    )
}