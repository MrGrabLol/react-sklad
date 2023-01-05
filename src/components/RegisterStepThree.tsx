import {IRegisterResponse} from "../interfaces/exportedInterfaces";
import React, {useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import {PrintableCard, PrintViewProps} from "./PrintableCard";
import '../css/RegisterStepThree.css'
import {ArrayOfPrintableCards} from "./ArrayOfPrintableCards";

interface RegisterStepThreeProps {
    registerResponse: IRegisterResponse,
    packPrint: boolean
}

export function RegisterStepThree({registerResponse, packPrint}: RegisterStepThreeProps) {
    let componentRef = useRef(null)
    const packRef = useRef(null)
    const positionsRef = useRef(null)

    const printHandler = useReactToPrint({
        content: () => componentRef.current
    })


    const [selectedClass, setSelectedClass] = useState<string>('small')

    // const templateObject: PrintViewProps = {
    //     mark: 'МАРКА123',
    //     standards: ['ГОСТ-123123', 'ГОСТ-456456'],
    //     diameter: '20',
    //     packing: 'УПАКОВКА-1',
    //     part: '12345678',
    //     plav: '123-456-789',
    //     weight: '20',
    //     id: 1
    // }

    const [positions] = useState<PrintViewProps[]>(() => {
        let temp: PrintViewProps[] = []
        for (let i = 0; i < registerResponse.positions.length; i++) {
            temp = [...temp, {
                mark: registerResponse.positions[i].mark,
                standards: registerResponse.positions[i].standards,
                diameter: registerResponse.positions[i].diameter,
                packing: registerResponse.positions[i].packing,
                part: registerResponse.positions[i].part,
                plav: registerResponse.positions[i].plav,
                weight: registerResponse.positions[i].weight,
                id: registerResponse.positions[i].id
            }]
        }
        return temp
    })
    const [pack] = useState(() => {
        return registerResponse.pack !== null ? {
            mark: registerResponse.pack.mark,
            standards: registerResponse.pack.standards,
            diameter: registerResponse.pack.diameter,
            packing: registerResponse.pack.packing,
            part: registerResponse.pack.part,
            plav: registerResponse.pack.plav,
            weight: registerResponse.pack.weight,
            id: registerResponse.pack.id
        } : null
    })

    const [stylesSmall, setStylesSmall] = useState({
        boxShadow: '0 0 5px 5px #5b38a3',
        borderRadius: '16px'
    })
    const [stylesBig, setStylesBig] = useState({
        boxShadow: '',
        borderRadius: ''
    })

    return (
        <div className='printable-container'>
            <div className='printable'>
                <div className='print-block margin-top'>
                    <div id='printChoiceSmall' style={stylesSmall} className='small-card' onClick={() => {
                        setSelectedClass('small')
                        setStylesBig({boxShadow: '', borderRadius: ''})
                        setStylesSmall({
                            boxShadow: '0 0 5px 5px #5b38a3', borderRadius: '16px'
                        })
                    }}>
                        <PrintableCard object={positions[0]} classname='small'/>
                    </div>
                </div>
                <div className='print-block'>
                    <div id='printChoiceBig' style={stylesBig} className='big-card' onClick={() => {
                        setSelectedClass('big')
                        setStylesSmall({boxShadow: '', borderRadius: ''})
                        setStylesBig({
                            boxShadow: '0 0 5px 5px #5b38a3', borderRadius: '16px'
                        })
                    }}>
                        <PrintableCard object={positions[0]} classname='big'/>
                    </div>
                </div>
            </div>
            <div className='print-button-container'>
                {pack !== null &&
                    <button className='printButton' onClick={() => {
                        componentRef = packRef
                        printHandler()
                    }}>Печать поддона</button>
                }
                <button className='printButton' onClick={() => {
                    componentRef = positionsRef
                    printHandler()
                }}>Печать карточек
                </button>
            </div>
            <div style={{display: 'none'}}>
                {pack !== null &&
                    <PrintableCard ref={packRef} object={pack} classname={selectedClass}/>
                }
                <ArrayOfPrintableCards ref={positionsRef} object={positions} classname={selectedClass}/>
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