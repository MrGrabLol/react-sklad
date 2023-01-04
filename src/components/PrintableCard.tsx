import React, {ForwardedRef} from "react";
import logo from "../assets/logo_new_v2.png";
import otk from '../assets/otk.png'
import '../css/PrintableCard.css'

export interface PrintViewProps {
    mark: string,
    standards: string[],
    diameter: string,
    packing: string,
    part: string,
    plav: string,
    weight: string,
    id: number
}

interface PrintableCardProps {
    object: PrintViewProps
    classname: string
}

export const PrintableCard = React.forwardRef(({object, classname}: PrintableCardProps, ref) => {

    return (
        <div //@ts-ignore
             ref={ref} className={'card ' + classname}>
            <img src={logo} className='logo' alt='logo'/>
            <img src={'http://localhost:8081/api/v1/code/' + object.id} className='barcode' alt='barcode'/>
            <p className="card-item__text"><span>Марка:</span> {object.mark}</p>
            <p className="card-item__text gost">{object.standards.join('\n')}</p>
            <p className="card-item__text"><span>Диаметр:</span> {object.diameter}</p>
            <p className="card-item__text"><span>Упаковка:</span> {object.packing}</p>
            <p className="card-item__text"><span>Партия:</span> {object.part}</p>
            <p className="card-item__text"><span>Плавка:</span> {object.plav}</p>
            <p className="card-item__text"><span>Вес:</span> {object.weight}</p>
            <img className='otk' src={otk} alt="OTK"/>
        </div>
    )
})