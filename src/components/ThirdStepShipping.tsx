import {IThirdStepShipping} from "../interfaces/exportedInterfaces";
import {PrintableCard, PrintViewProps} from "./PrintableCard";
import {ArrayOfPrintableCards} from "./ArrayOfPrintableCards";
import React, {useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";

interface ThirdStepShippingProps {
    object: IThirdStepShipping
}

export function ThirdStepShipping({object}: ThirdStepShippingProps) {

    let shipRef = useRef(null)
    const printShipRef = useRef(null)
    const newShipRef = useRef(null)

    const [printField] = useState<PrintViewProps[]>(() => {
        let temp: PrintViewProps[] = []
        for (let i = 0; i < object.print.length; i++) {
            temp = [...temp, {
                mark: object.print[i].mark,
                standards: object.print[i].standards,
                diameter: object.print[i].diameter,
                packing: object.print[i].packing,
                part: object.print[i].part,
                plav: object.print[i].plav,
                weight: object.print[i].weight,
                id: object.print[i].id
            }]
        }
        return temp
    })
    const [newField] = useState<PrintViewProps[]>(() => {
        let temp: PrintViewProps[] = []
        for (let i = 0; i < object.new.length; i++) {
            temp = [...temp, {
                mark: object.new[i].mark,
                standards: object.new[i].standards,
                diameter: object.new[i].diameter,
                packing: object.new[i].packing,
                part: object.new[i].part,
                plav: object.new[i].plav,
                weight: object.new[i].weight,
                id: object.new[i].id
            }]
        }
        return temp
    })

    const printHandler = useReactToPrint({
        content: () => shipRef.current
    })

    const [stylesSmall, setStylesSmall] = useState({
        boxShadow: '0 0 5px 5px #5b38a3',
        borderRadius: '16px'
    })
    const [stylesBig, setStylesBig] = useState({
        boxShadow: '',
        borderRadius: ''
    })
    const [selectedClass, setSelectedClass] = useState('small')

    return (
        <div className='printable-container'>
            <div className='printable'>
                <div className='print-block margin-top'>
                    <div id='printChoiceSmall' style={stylesSmall} className='small-card' onClick={() => {
                        setSelectedClass('small')
                        setStylesSmall({boxShadow: '0 0 5px 5px #5b38a3', borderRadius: '16px'})
                        setStylesBig({boxShadow: '', borderRadius: ''})
                    }}>
                        <PrintableCard object={printField[0]} classname='small'/>
                    </div>
                </div>
                <div className='print-block'>
                    <div id='printChoiceBig' style={stylesBig} className='big-card' onClick={() => {
                        setSelectedClass('big')
                        setStylesBig({boxShadow: '0 0 5px 5px #5b38a3', borderRadius: '16px'})
                        setStylesSmall({boxShadow: '', borderRadius: ''})
                    }}>
                        <PrintableCard object={printField[0]} classname='big'/>
                    </div>
                </div>
            </div>
            <div className='print-button-container'>
                <button className='printButton' onClick={() => {
                    shipRef = printShipRef
                    printHandler()
                }}>Печать измененных карточек</button>
                <button className='printButton' onClick={() => {
                    shipRef = newShipRef
                    printHandler()
                }}>Печать отгруженных карточек</button>
            </div>
            <div style={{display: 'none'}}>
                <ArrayOfPrintableCards ref={printShipRef} object={printField} classname={selectedClass}/>
                <ArrayOfPrintableCards ref={newShipRef} object={newField} classname={selectedClass}/>
            </div>
        </div>
    )
}