import {Card} from "./Card";
import React from "react";
import {IModelsCard} from "../interfaces/models";
import '../css/CardView.css'

interface CardViewProps {
    cards: IModelsCard[]
    selectedMarks: string[],
    selectedPacks: string[]
}

export function CardView({cards, selectedMarks, selectedPacks}: CardViewProps) {
    return (
        <div className='card-container'>
            {cards.map((card, i) => <Card card={card} key={i}/>)}
        </div>
    )
}