import {ISendHistoryFields} from "../interfaces/exportedInterfaces";
import {Link} from "react-router-dom";

interface SendHistoryTableRowProps {
    item: ISendHistoryFields
}

export function SendHistoryTableRow({item}: SendHistoryTableRowProps) {
    return (
        <tr>
            <Link to={'/send-details/' + item.id}>
                <td>{item.id}</td>
            </Link>
            <td>{item.source} &#8594; {item.destination}</td>
            <td>{item.createdDate}</td>
            <td>{item.creator}</td>
            <td>{item.carPlate.length > 0 ? item.carPlate : 'Не указан'}</td>
            <td>{item.status}</td>
        </tr>
    )
}