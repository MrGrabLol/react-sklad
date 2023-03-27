import {useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import {PrintableCard, PrintViewProps} from "./PrintableCard";
import {IThirdStepShipping} from "../interfaces/exportedInterfaces";
import {ArrayOfPrintableCards} from "./ArrayOfPrintableCards";

interface PositionShippingPrintProps {
    item: IThirdStepShipping
}

export function PositionShippingPrint({item}: PositionShippingPrintProps) {

    let printRef = useRef(null)

    const [toPrint] = useState<PrintViewProps[]>(() => {
            return [{
                mark: item.print[0].mark,
                standards: item.print[0].standards,
                diameter: item.print[0].diameter,
                packing: item.print[0].packing,
                part: item.print[0].part,
                plav: item.print[0].plav,
                weight: item.print[0].weight,
                id: item.print[0].id
            }, {
                mark: item.new[0].mark,
                standards: item.new[0].standards,
                diameter: item.new[0].diameter,
                packing: item.new[0].packing,
                part: item.new[0].part,
                plav: item.new[0].plav,
                weight: item.new[0].weight,
                id: item.new[0].id
            }]
    })

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

    const [classname, setClassname] = useState('small')
    const [stylesSmall, setStylesSmall] = useState(selectedStyles)
    const [stylesBig, setStylesBig] = useState(noStyles)
    const [clicked, setClicked] = useState(false)

    return (
        <div className='printable-container'>
            {!printRef.current && clicked && <h2 style={{color: 'red'}}>Выберите размер</h2>}
            <div className='printable'>
                <div className='print-block margin-top'>
                    <div id='printChoiceSmall' style={stylesSmall} className='small-card' onClick={() => {
                        setClassname('small')
                        setStylesSmall(selectedStyles)
                        setStylesBig(noStyles)
                    }}>
                        <PrintableCard object={toPrint[0]} classname='small'/>
                    </div>
                </div>
                <div className='print-block'>
                    <div id='printChoiceBig' style={stylesBig} className='big-card' onClick={() => {
                        setClassname('big')
                        setStylesBig(selectedStyles)
                        setStylesSmall(noStyles)
                    }}>
                        <PrintableCard object={toPrint[0]} classname='big'/>
                    </div>
                </div>
            </div>
            <div className='print-button-container'>
                <button className='printButton' onClick={() => {
                    setClicked(true)
                    printHandler()
                }}>Печать карточек</button>
            </div>
            <div style={{display: 'none'}}>
                <ArrayOfPrintableCards ref={printRef} object={toPrint} classname={classname}/>
            </div>
        </div>
    )
}