import {Card} from "../components/Card";
import {IModelsCard} from "../interfaces/models";

interface CardIdViewProps {
    card: IModelsCard
}

export function CardIdView({card}: CardIdViewProps) {



    return (
        <div className='card-id-container'>
            <p>LSLDLDLDLSLSLDLSLDLS</p>
            <h3>{card.id}</h3>
        </div>
    )
}