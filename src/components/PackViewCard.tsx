import React, {useState} from "react";
import {IPositionsResponse} from "../interfaces/exportedInterfaces";
import '../css/PackViewCard.css'

interface PackViewCardProps {
    position: IPositionsResponse
}

export function PackViewCard({position}: PackViewCardProps) {
    const [weight, setWeight] = useState<string>(position.weight)

    return (
        <div className='card-item-ship'>
            <p className='card-item__title-ship'>{position.mark}</p>
            {position.standards.length > 0 && <p className='card-item__text-ship'><span className='span-ship'>Стандарты: </span>{position.standards.join(',')}</p>}
            <p className='card-item__text-ship'><span className='span-ship'>Диаметр: </span>{position.diameter}</p>
            <p className='card-item__text-ship'><span className='span-ship'>Упаковка: </span>{position.packing}</p>
            <p className='card-item__text-ship'><span className='span-ship'>Партия: </span>{position.part}</p>
            <p className='card-item__text-ship'><span className='span-ship'>Плавка: </span>{position.plav}</p>
            <div className='input-block-step-two'>
                <p className='card-item__text-ship'><span className='span-ship'>Вес: </span></p>
                <input type="text" value={weight} onChange={(event) => setWeight(event.target.value.replace(/[^.1234567890]+/g, ''))} required/>
            </div>
            <p className='card-item__text-ship'><span className='span-ship'>Производитель: </span>{position.manufacturer}</p>
            {position.comment && <p className='card-item__text-ship'><span className='span-ship'>Комментарий: </span>{position.comment}</p>}
        </div>
    )
}