import '../css/SearchTableView.css'
import React from "react";
import {ISearchModels} from "../interfaces/models";
import {SearchTableRow} from "./SearchTableRow";

interface SearchTableViewProps {
    models: ISearchModels[]
}

export function SearchTableView({models}: SearchTableViewProps) {
    return (
        <table className='search-table'>
            <thead>
            <tr>
                <th>Марка</th>
                <th>Диаметр</th>
                <th>Упаковка</th>
                <th>Партия</th>
                <th>Плавка</th>
                <th>Солнечногорск</th>
                <th>Белорецк(Склад)</th>
                <th>Белорецк(Произ-во)</th>
            </tr>
            </thead>
            <tbody>
                {models.map((model, index) => <SearchTableRow model={model} key={index} />)}
            </tbody>
        </table>
    )
}