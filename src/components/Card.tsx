import '../css/Card.css'
import {IPositionsResponse} from "../interfaces/exportedInterfaces";
import {Link} from "react-router-dom";
import React from "react";

interface ModelCardProps {
    card: IPositionsResponse
}

export function Card({card}: ModelCardProps) {

    const borderStyle = () => {
        if (card.status === 'В наличии') {
            return '3px solid #3b4da3'
        } else if (card.status === 'Отгружено') {
            return '3px solid gray'
        } else if (card.status === 'Резерв') {
            return '3px solid rgb(253, 185, 0)'
        } else {
            return '3px dashed #3b4da3'
        }
    }

    return (
        <Link className="card-item" target="_blank" to={'/position/' + card.id + '/info'} style={{border: borderStyle()}}>
            <div>
                <p className="card-item__title">{card.type}</p>
                <p className="card-item__text"><span>Марка:</span> {card.mark}</p>
                <p className="card-item__text"><span>Диаметр:</span> {card.diameter}</p>
                <p className="card-item__text"><span>Упаковка:</span> {card.packing}</p>
                <p className="card-item__text"><span>Партия:</span> {card.part}</p>
                <p className="card-item__text"><span>Плавка:</span> {card.plav}</p>
                <p className="card-item__text"><span>Вес:</span> {card.weight}</p>
                {card.comment && <p className="card-item__text"><span>Комментарий:</span> {card.comment}</p>}
                <p className="card-item__text"><span>Статус:</span> {card.status}</p>
                <p className="card-item__text"><span>Склад:</span> {card.location}</p>
            </div>
        </Link>
    )
}