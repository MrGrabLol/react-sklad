import {useSendHistory} from "../hooks/useSendHistory";
import {Loader} from "../components/Loader";
import {SendHistoryTableRow} from "../components/SendHistoryTableRow";
import React from "react";

export function SendHistoryPage() {
    const {sendHistory, error, loading} = useSendHistory()

    return (
        <div>
            {loading && <Loader/>}
            {error && <h1 style={{color: 'red'}}>Ошибка загрузки: {error}</h1>}
            {!loading &&
                <table style={{marginTop: '6%', width: '94.5%'}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th style={{width: '20%'}}>Откуда</th>
                        <th style={{width: '20%'}}>Куда</th>
                        <th>Дата создания</th>
                        <th style={{width: '20%'}}>Создатель</th>
                        <th>Номер машины</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                        {sendHistory.transfers.map((send, index) => <SendHistoryTableRow item={send} key={index}/>)}
                    </tbody>
                </table>
            }
        </div>
    )
}