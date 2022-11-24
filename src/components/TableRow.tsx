import React from "react";
import {IModels} from "../interfaces/models";

export interface ModelsProps {
    model: IModels
}

export function TableRow({model}: ModelsProps) {
    return (
        <>
            <tr>
                <td>{model.mark}</td>
                <td>{model.diameter}</td>
                <td>{model.packing}</td>
                <td>{model.solnechnogorsk}</td>
                <td>{model.belSklad}</td>
                <td>{model.manufacture}</td>
            </tr>
        </>
    )
}