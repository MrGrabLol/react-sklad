import {IRegisterResponse} from "../interfaces/exportedInterfaces";
import React from "react";
import {PrintableCard, PrintViewProps} from "./PrintableCard";
import '../css/ArrayOfPrintableCards.css'

interface ArrayOfPrintableCardsProps {
    object: PrintViewProps[],
    classname: string
}

export const ArrayOfPrintableCards = React.forwardRef(({object, classname}: ArrayOfPrintableCardsProps, ref) => {
        return (
            <div //@ts-ignore
                ref={ref}>
                {object.map(obj => <PrintableCard object={obj} classname={classname}/>)}
            </div>
        )
    }
)
