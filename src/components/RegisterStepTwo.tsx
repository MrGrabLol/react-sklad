import {IPositionModel, IRegisterModel} from "../interfaces/exportedInterfaces";
import {CardView} from "./CardView";
import {CardRegister} from "./CardRegister";
import {useState} from "react";

interface RegisterStepTwoProps {
    quantity: number,
    diameterBlock: boolean,
    packageBlock: boolean,
    plavBlock: boolean,
    partBlock: boolean,
    weightBlock: boolean,
    manufacturerBlock: boolean,
    commentBlock: boolean,
    registerProp: IPositionModel
    setRegisterProp: (prop: IPositionModel) => void
}

export function RegisterStepTwo({quantity, diameterBlock, packageBlock, plavBlock, partBlock,
                                 weightBlock, manufacturerBlock, commentBlock, registerProp, setRegisterProp
                                }: RegisterStepTwoProps) {

    const [cardArray, setCardArray] = useState<IPositionModel[]>([])
    const [once, setOnce] = useState(false)
    if (!once) {
        let tempArray: IPositionModel[] = []
        for (let i = 0; i < quantity; i++) {
            tempArray = [...tempArray, {...registerProp}]
        }
        setCardArray(tempArray)
        setOnce(true)
    }


    return (
        <form>
            <h2 className='header-reg'>Введите незаполненные поля</h2>
                    <div className='card-container-reg'>
                        {cardArray.map((card, index) => <CardRegister card={card} key={index}
                            diameterBlock={diameterBlock}
                            packageBlock={packageBlock} plavBlock={plavBlock}
                            partBlock={partBlock} weightBlock={weightBlock}
                            manufacturerBlock={manufacturerBlock}
                            commentBlock={commentBlock}
                            registerProp={registerProp}
                            setRegisterProp={setRegisterProp}
                            arrayIndex={index}
                            mainArray={cardArray}
                        />)}
                    </div>
            <button type='submit' className='form-main-button-step-two'>Подтвердить</button>
        </form>
    )
}