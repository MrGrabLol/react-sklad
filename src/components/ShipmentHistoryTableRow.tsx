import {IShippingHistory} from "../interfaces/exportedInterfaces";

interface ShipmentHistoryTableRowProps {
    item: IShippingHistory
}

export function ShipmentHistoryTableRow({item}: ShipmentHistoryTableRowProps) {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.weight}</td>
            <td>{item.customer}</td>
            <td>{item.bill}</td>
            <td>{item.date}</td>
        </tr>
    )
}