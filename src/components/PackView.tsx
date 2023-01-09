import {IPackResponse, IShipping} from "../interfaces/exportedInterfaces";
import {PackViewCard} from "./PackViewCard";
import '../css/PackView.css'

interface PackViewProps {
    pack: IPackResponse,
    idWeightArray: IShipping[]
}

export function PackView({pack, idWeightArray}: PackViewProps) {
    return (
        <div style={{marginTop: '30px'}}>
            <h1>Поддон №{pack.id}</h1>
            <div className='shipping-pack'>
                {pack.positions.map((position, index) => <PackViewCard position={position} key={index} index={index} idWeightArray={idWeightArray}/>)}
            </div>
        </div>
    )
}