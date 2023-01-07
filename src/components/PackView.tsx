import {IPackResponse} from "../interfaces/exportedInterfaces";
import {PackViewCard} from "./PackViewCard";
import '../css/PackView.css'

interface PackViewProps {
    pack: IPackResponse
}

export function PackView({pack}: PackViewProps) {
    return (
        <div style={{marginTop: '30px'}}>
            <h1>Поддон №{pack.id}</h1>
            <div className='shipping-pack'>
                {pack.positions.map(position => <PackViewCard position={position}/>)}
            </div>
        </div>
    )
}