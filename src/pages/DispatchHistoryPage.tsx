import React from "react";
import {useShippingHistory} from "../hooks/useShippingHistory";
import {Loader} from "../components/Loader";
import {ShipmentHistoryTableRow} from "../components/ShipmentHistoryTableRow";

export function DispatchHistoryPage() {
    const {shippingHistory, error, loading} = useShippingHistory()

    return (
        <div>
            {loading && <Loader/>}
            {error && <h1 style={{color: 'red'}}>Ошибка загрузки: {error}</h1>}
            {!loading &&
                <table style={{marginTop: '6%', width: '94.5%'}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Вес</th>
                        <th style={{width: '32%'}}>Покупатель</th>
                        <th>Счёт</th>
                        <th style={{width: '20%'}}>Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                        {shippingHistory.map((ship, index) => <ShipmentHistoryTableRow item={ship} key={index}/>)}
                    </tbody>
                </table>
            }
        </div>
    )
}