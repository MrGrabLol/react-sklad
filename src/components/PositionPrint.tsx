import {useLoaderData} from "react-router-dom";
import {PrintableCard, PrintViewProps} from "./PrintableCard";
import React, {useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import '../css/RegisterStepThree.css'
import {ArrayOfPrintableCards} from "./ArrayOfPrintableCards";

export function PositionPrint() {
    //@ts-ignore
    const {card} = useLoaderData()

    let printRef = useRef(null)
    const smallRef = useRef(null)
    const bigRef = useRef(null)

    const printHandler = useReactToPrint({
        content: () => printRef.current
    })

    const noStyles = {
        borderRadius: '',
        boxShadow: ''
    }

    const selectedStyles = {
        borderRadius: '16px',
        boxShadow: '0 0 5px 5px #5b38a3'
    }

    const object = {
        mark: card.mark,
        standards: card.standards,
        diameter: card.diameter,
        packing: card.packing,
        part: card.part,
        plav: card.plav,
        weight: card.weight,
        id: card.id
    }

    const [stylesSmall, setStylesSmall] = useState(noStyles)
    const [stylesBig, setStylesBig] = useState(noStyles)
    const [clicked, setClicked] = useState(false)
    const [selectedClass, setSelectedClass] = useState('')

    return (
        <div className='printable-container'>
            {
                (((card.type === 'Позиция' || card.type === 'позиция') && !printRef.current) ||
                ((card.type === 'Поддон' || card.type === 'поддон') && selectedClass === '')) &&
                clicked && <h2 style={{color: 'red'}}>Выберите размер</h2>
            }
            {(card.type === 'Позиция' || card.type === 'позиция') && <div>
                <div className='printable'>
                    <div className='print-block margin-top'>
                        <div id='printChoiceSmall' style={stylesSmall} className='small-card' onClick={() => {
                            printRef.current = smallRef.current
                            setStylesSmall(selectedStyles)
                            setStylesBig(noStyles)
                        }}>
                            <PrintableCard ref={smallRef} object={object} classname='small'/>
                        </div>
                    </div>
                    <div className='print-block'>
                        <div id='printChoiceBig' style={stylesBig} className='big-card' onClick={() => {
                            printRef.current = bigRef.current
                            setStylesBig(selectedStyles)
                            setStylesSmall(noStyles)
                        }}>
                            <PrintableCard ref={bigRef} object={object} classname='big'/>
                        </div>
                    </div>
                </div>
                <div className='print-button-container'>
                    <button className='printButton' onClick={() => {
                        setClicked(true)
                        printHandler()
                    }}>Печать карточки
                    </button>
                </div>
            </div>}
            {(card.type === 'Поддон' || card.type === 'поддон') && <div>
                <div className='printable'>
                    <div className='print-block margin-top'>
                        <div id='printChoiceSmall' style={stylesSmall} className='small-card' onClick={() => {
                            setSelectedClass('small')
                            setStylesSmall(selectedStyles)
                            setStylesBig(noStyles)
                        }}>
                            <PrintableCard object={object} classname='small'/>
                        </div>
                    </div>
                    <div className='print-block'>
                        <div id='printChoiceBig' style={stylesBig} className='big-card' onClick={() => {
                            setSelectedClass('big')
                            setStylesBig(selectedStyles)
                            setStylesSmall(noStyles)
                        }}>
                            <PrintableCard object={object} classname='big'/>
                        </div>
                    </div>
                </div>
                <div className='print-button-container'>
                    <button className='printButton' onClick={() => {
                        setClicked(true)
                        if (selectedClass !== '') {
                            printRef = smallRef
                            printHandler()
                        }
                    }}>Печать поддона
                    </button>
                    <button className='printButton' onClick={() => {
                        setClicked(true)
                        if (selectedClass !== '') {
                            printRef = bigRef
                            printHandler()
                        }
                    }}>Печать карточек
                    </button>
                </div>
                <div style={{display: 'none'}}>
                    <PrintableCard object={object} classname={selectedClass} ref={smallRef}/>
                    <ArrayOfPrintableCards ref={bigRef} object={card.positions} classname={selectedClass}/>
                </div>
            </div>}
        </div>
    )
}