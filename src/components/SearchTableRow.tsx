import React from "react";
import {ISearchModels} from "../interfaces/exportedInterfaces";

interface SearchTableRowProps {
    model: ISearchModels
}

export function SearchTableRow({model}: SearchTableRowProps) {
    return (
        <tr>
            <td>{model.mark}</td>
            <td>{model.diameter}</td>
            <td>{model.pack}</td>
            <td>{model.part}</td>
            <td>{model.plav}</td>
            <td>{model.solnechnogorsk}</td>
            <td>{model.belSklad}</td>
            <td>{model.manufacture}</td>
        </tr>
    )

}