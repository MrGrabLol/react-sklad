import {IRegisterResponse} from "../interfaces/exportedInterfaces";
import React, {ReactInstance, useRef, useState} from "react";
import {useLoaderData} from "react-router-dom";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import logo from "../assets/logo_new_v2.png";
import {PrintableCard, PrintViewProps} from "./PrintableCard";
import '../css/RegisterStepThree.css'

interface RegisterStepThreeProps {
    registerResponse: IRegisterResponse,
    packPrint: boolean
}

export function RegisterStepThree({registerResponse, packPrint}: RegisterStepThreeProps) {
    let componentRef = useRef(null)

    const printHandler = useReactToPrint({
        content: () => componentRef.current
    })
    // const [selected, setSelected] = useState(true)

    const templateObject: PrintViewProps = {
        mark: 'МАРКА123',
        standards: ['ГОСТ-123123', 'ГОСТ-456456'],
        diameter: '20',
        packing: 'УПАКОВКА-1',
        part: '12345678',
        plav: '123-456-789',
        weight: 20,
        id: 1
    }

    return (
        <div className='mainbar_card'>
            <div className='logo-card'>
                <PrintableCard //@ts-ignore
                 ref={componentRef} object={templateObject} classname='small'/>
            </div>
            <div className='no-logo-card'>
                <PrintableCard object={templateObject} classname='big'/>
            </div>
            <div className='print-button-container'>
                {packPrint &&
                    <button className='printButton'>Печать поддона</button>
                }
                <button className='printButton' onClick={printHandler}>Печать карточек отдельно</button>
            </div>
        </div>
    )
}

// export default function PositionPrint() {
//     let cardNoLogo = useRef(null);
//     let cardWithLogo = useRef(null);
//     const { card } = useLoaderData();
//
//     return (
//         <div className={'mainbar_card'}>
//             <div className={'logo-card card-print'}>
//                 <ReactToPrint
//                     trigger={() => <button>Печать с лого</button>}
//                     content={() => cardNoLogo }/>
//                 <PrintableCard ref={el => (cardNoLogo = el)} card={card} logo={true}  />
//             </div>
//             <div className={'no-logo-card card-print'}>
//                 <ReactToPrint
//                     trigger={() => <button>Печать без лого</button>}
//                     content={() => cardWithLogo }/>
//                 <PrintableCard ref={el => (cardWithLogo = el)} card={card} />
//             </div>
//         </div>
//     )
// }