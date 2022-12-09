import '../css/Card.css'
import {IModelsCard} from "../interfaces/models";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {CardIdView} from "../pages/CardIdView";
import React from "react";
import {AdmissionPage} from "../pages/AdmissionPage";

interface ModelCardProps {
    card: IModelsCard
}

export function Card({card}: ModelCardProps) {

    function isComment() {
        return card.comment !== '';
    }

    return (
        <Link className="card-item" to={'/sklad/show/' + card.id}>
            <div>
                <p className="cart-item__title">{card.type}</p>
                <p className="card-item__text"><span>Марка:</span> {card.mark}</p>
                <p className="card-item__text"><span>Диаметр:</span> {card.diameter}</p>
                <p className="card-item__text"><span>Упаковка:</span> {card.packing}</p>
                <p className="card-item__text"><span>Партия:</span> {card.part}</p>
                <p className="card-item__text"><span>Плавка:</span> {card.plav}</p>
                <p className="card-item__text"><span>Вес:</span> {card.weight}</p>
                {isComment() && <p className="card-item__text"><span>Комментарий:</span> {card.comment}</p>}
                <p className="card-item__text"><span>Статус:</span> {card.status}</p>
                <p className="card-item__text"><span>Склад:</span> {card.location}</p>
            </div>
        </Link>
    )
}