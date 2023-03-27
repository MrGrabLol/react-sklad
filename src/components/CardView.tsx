import {Card} from "./Card";
import React from "react";
import {IPositionsResponse} from "../interfaces/exportedInterfaces";
import '../css/CardView.css'

interface CardViewProps {
    cards: IPositionsResponse[]
}

export function CardView({cards}: CardViewProps) {
    return (
        <div className='card-container'>
            {cards.map((card, i) => <Card card={card} key={i}/>)}
        </div>
    )
}