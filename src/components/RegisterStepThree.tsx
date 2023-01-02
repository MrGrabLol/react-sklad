import {IRegisterResponse} from "../interfaces/exportedInterfaces";

interface RegisterStepThreeProps {
    registerResponse: IRegisterResponse,
    packPrint: boolean
}

export function RegisterStepThree({registerResponse, packPrint}: RegisterStepThreeProps) {
    return (
        <div>
            {packPrint &&
                <div className='card-item'>
                    <img src={'http://localhost:8081/api/v1/code/' + registerResponse.pack.id} alt="data-matrix-code"/>
                    <p className='card-item__title'>{registerResponse.pack.type}</p>
                    <p className='card-item__text'><span>Марка:</span> {registerResponse.pack.mark}</p>
                    <p className='card-item__text'><span>Стандарты:</span> {registerResponse.pack.standards.join(', ')}</p>
                    <p className='card-item__text'><span>Диаметр: </span> {registerResponse.pack.diameter}</p>
                    <p className='card-item__text'><span>Упаковка: </span></p>
                    <p className='card-item__text'><span></span> {}</p>
                    <p className='card-item__text'><span></span> {}</p>
                    <p className='card-item__text'><span></span> {}</p>
                </div>
            }
        </div>
    )
}