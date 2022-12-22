import {IPositionModel} from "../interfaces/exportedInterfaces";
import '../css/CardRegister.css'
import React from "react";

interface CardRegisterProps {
    card: IPositionModel,
    diameterBlock: boolean,
    packageBlock: boolean,
    plavBlock: boolean,
    partBlock: boolean,
    weightBlock: boolean,
    manufacturerBlock: boolean,
    commentBlock: boolean,
    registerProp: IPositionModel
    setRegisterProp: (prop: IPositionModel) => void
    arrayIndex: number,
    mainArray: IPositionModel[]
}

export function CardRegister({card, diameterBlock, packageBlock, plavBlock, partBlock, weightBlock, manufacturerBlock,
                                 commentBlock, registerProp, setRegisterProp, arrayIndex, mainArray}: CardRegisterProps) {
    return (
            <div className='card-item-reg'>
                <p className='cart-item__title-reg'>{card.mark}</p>
                <div className='input-block-step-two'>
                    <p className='card-item__text-reg'><span className='span-reg'>Стандарты: </span>{card.standard.standards.join(', ')}</p>
                </div>
                <div className='input-block-step-two'>
                    <p className='card-item__text-reg'><span className='span-reg'>Диаметр: </span>{!diameterBlock && card.diameter}</p>
                    {diameterBlock &&
                        <input type="text" onChange={event => mainArray[arrayIndex].diameter = event.target.value} required/>
                    }
                </div>
                <div className='input-block-step-two'>
                    <p className='card-item__text-reg'><span className='span-reg'>Упаковка: </span>{!packageBlock && card.packing}</p>
                    {packageBlock &&
                        <input type="text" onChange={event => mainArray[arrayIndex].packing = event.target.value} required/>
                    }
                </div>
                <div className='input-block-step-two'>
                    <p className='card-item__text-reg'><span className='span-reg'>Партия: </span>{!partBlock && card.part}</p>
                    {partBlock &&
                        <input type="text" onChange={event => mainArray[arrayIndex].part = event.target.value} required/>
                    }
                </div>
                <div className='input-block-step-two'>
                    <p className='card-item__text-reg'><span className='span-reg'>Плавка: </span>{!plavBlock && card.plav}</p>
                    {plavBlock &&
                        <input type="text" onChange={event => mainArray[arrayIndex].plav = event.target.value} required/>
                    }
                </div>
                <div className='input-block-step-two'>
                    <p className='card-item__text-reg'><span className='span-reg'>Вес: </span>{!weightBlock && card.weight}</p>
                    {weightBlock &&
                        <input type="text" onChange={event => mainArray[arrayIndex].weight = Number(event.target.value)} required/>
                    }
                </div>
                <div className='input-block-step-two'>
                    <p className='card-item__text-reg'><span className='span-reg'>Производитель: </span>{!manufacturerBlock && card.manufacturer}</p>
                    {manufacturerBlock &&
                        <input type="text" onChange={event => mainArray[arrayIndex].manufacturer = event.target.value} required/>
                    }
                </div>
                <div className='input-block-step-two'>
                    <p className='card-item__text-reg'><span className='span-reg'>Комментарий: </span>{!commentBlock && card.comment}</p>
                    {commentBlock &&
                        <input type="text" onChange={event => mainArray[arrayIndex].comment = event.target.value}/>
                    }
                </div>
            </div>
    )
}