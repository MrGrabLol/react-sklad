import React from "react";
import logo from "../assets/logo_new_v2.png"
import '../css/PrintableCard.css'

export const PrintableCard = React.forwardRef((props, ref) => {

    return (
        <div className={'card ' + (props.logo ? 'big' : 'small')} ref={ref}>
            <img src={logo} className='logo' alt={'barcode'}/>
            <img src={'http://localhost:8081/api/v1/code/' + props.card.id} className='barcode' alt={'barcode'}/>
            <p className="card-item__text"><span>Марка:</span> {props.card.mark}</p>
            <p className="card-item__text"><span>Диаметр:</span> {props.card.diameter}</p>
            <p className="card-item__text"><span>Упаковка:</span> {props.card.packing}</p>
            <p className="card-item__text"><span>Партия:</span> {props.card.part}</p>
            <p className="card-item__text"><span>Плавка:</span> {props.card.plav}</p>
            <p className="card-item__text"><span>Вес:</span> {props.card.weight}</p>
        </div>
    )
})