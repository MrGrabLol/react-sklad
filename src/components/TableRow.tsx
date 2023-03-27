import React from "react";
import {IModels} from "../interfaces/exportedInterfaces";

export interface ModelsProps {
    model: IModels
}

export function TableRow({model}: ModelsProps) {
    return (
        <tr>
            <td>{model.mark}</td>
            <td>{model.diameter}</td>
            <td>{model.packing}</td>
            <td>{model.solnechnogorsk} / <span style={{fontWeight: model.solnechnogorskReserve === '0' ? 'normal' : "bold"}}>{model.solnechnogorskReserve}</span></td>
            <td>{model.belSklad} / <span style={{fontWeight: model.solnechnogorskReserve === '0' ? 'normal' : "bold"}}>{model.belSkladReserve}</span></td>
            <td>{model.manufacture} / <span style={{fontWeight: model.solnechnogorskReserve === '0' ? 'normal' : "bold"}}>{model.manufactureReserve}</span></td>
        </tr>
    )
}