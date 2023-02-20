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
            <td>{model.solnechnogorsk} ({model.solnechnogorskReserve})</td>
            <td>{model.belSklad} ({model.belSkladReserve})</td>
            <td>{model.manufacture} ({model.manufactureReserve})</td>
        </tr>
    )
}