import {ISendHistoryFields} from "../interfaces/exportedInterfaces";

interface SendHistoryTableRowProps {
    item: ISendHistoryFields
}

export function SendHistoryTableRow({item}: SendHistoryTableRowProps) {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.source}</td>
            <td>{item.destination}</td>
            <td>{item.createdDate}</td>
            <td>{item.creator}</td>
            <td>{item.carPlate}</td>
            <td>{item.status}</td>
        </tr>
    )
}