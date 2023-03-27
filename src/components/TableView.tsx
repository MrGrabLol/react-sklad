import {TableRow} from "./TableRow";
import React from "react";
import {IModels} from "../interfaces/exportedInterfaces";
import '../css/TableView.css'

interface TableViewProps {
    models: IModels[]
    selectedMarks: string[],
    selectedPacks: string[],
    selectedDiameterLeft: number,
    selectedDiameterRight: number
}

export function TableView({
                              models,
                              selectedMarks,
                              selectedPacks,
                              selectedDiameterLeft,
                              selectedDiameterRight
                          }: TableViewProps) {
    return (
        <div id='table-wrap'>
            <table>
                <thead>
                <tr>
                    <th>Марка</th>
                    <th>Диаметр</th>
                    <th>Упаковка</th>
                    <th>Солнечногорск</th>
                    <th>Белорецк(Склад)</th>
                    <th>Белорецк(Произ-во)</th>
                </tr>
                </thead>
                <tbody>
                {models.filter((model) => {
                    return (selectedMarks.length > 0) ? selectedMarks.includes(model.mark) : model
                }).filter((model) => {
                    return (Number(model.diameter) >= selectedDiameterLeft && Number(model.diameter) <= selectedDiameterRight)
                }).filter((model) => {
                    return (selectedPacks.length > 0) ? selectedPacks.includes(model.packing) : model
                })
                    .map((model, i) => <TableRow model={model} key={i}/>)
                }
                </tbody>
            </table>
        </div>
    )
}