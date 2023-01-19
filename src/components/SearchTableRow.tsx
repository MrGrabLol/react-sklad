import React from "react";
import {ISearchModels} from "../interfaces/exportedInterfaces";
import {Link} from "react-router-dom";

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
            <td><Link to={'/weights/' + model.mark + '/' + model.diameter + '/' + model.pack + '/' + model.plav + '/' + model.part.replace('/', '+')}>{model.solnechnogorsk}</Link></td>
            <td><Link to={'/weights/' + model.mark + '/' + model.diameter + '/' + model.pack + '/' + model.plav + '/' + model.part.replace('/', '+')}>{model.belSklad}</Link></td>
            <td><Link to={'/weights/' + model.mark + '/' + model.diameter + '/' + model.pack + '/' + model.plav + '/' + model.part.replace('/', '+')}>{model.manufacture}</Link></td>
        </tr>
    )

}