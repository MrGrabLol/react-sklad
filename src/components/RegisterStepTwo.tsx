import {IPositionModel, IRegisterModel} from "../interfaces/exportedInterfaces";
import {CardView} from "./CardView";
import {CardRegister} from "./CardRegister";
import React, {useState} from "react";
import axios from "axios";
import {RegisterStepThree} from "./RegisterStepThree";

interface RegisterStepTwoProps {
    quantity: number,
    diameterBlock: boolean,
    packageBlock: boolean,
    plavBlock: boolean,
    partBlock: boolean,
    weightBlock: boolean,
    manufacturerBlock: boolean,
    commentBlock: boolean,
    registerProp: IPositionModel,
    setRegisterProp: (prop: IPositionModel) => void,
    packs: string[],
    manufacturers: string[],
    ulFocus: boolean,
    showAutocomplete: (prop1: string, prop2: string[], prop3: (prop: string) => void, prop4: (prop: boolean) => void,
                       prop5: boolean, prop6: string, prop7: string, prop8: string) => JSX.Element,
}

export function RegisterStepTwo({
                                    quantity, diameterBlock, packageBlock, plavBlock, partBlock,
                                    weightBlock, manufacturerBlock, commentBlock, registerProp, setRegisterProp,
                                    packs, manufacturers, ulFocus,
                                    showAutocomplete
                                }: RegisterStepTwoProps) {

    const [cardArray, setCardArray] = useState<IPositionModel[]>([])
    const [generalError, setGeneralError] = useState('')
    // const [registerModel, setRegisterModel] = useState<IRegisterModel>({positions: [], pack: true})
    const [pack, setPack] = useState(() => {
        return !diameterBlock && !packageBlock && !partBlock && !plavBlock && !manufacturerBlock;
    })
    // const [] = useState()
    const [checkedPack, setCheckedPack] = useState(false)
    const [thirdStepRegister, setThirdStepRegister] = useState(false)

    const [once, setOnce] = useState(false)
    if (!once) {
        let tempArray: IPositionModel[] = []
        for (let i = 0; i < quantity; i++) {
            tempArray = [...tempArray, {...registerProp}]
        }
        setCardArray(tempArray)
        setOnce(true)
    }

    async function submitHandler(event: { preventDefault: () => void; }) {
        setGeneralError('')
        let error = ''
        for (let i = 0; i < quantity; i++) {
            if (cardArray[i].weight === 0 || isNaN(cardArray[i].weight) || Number(cardArray[i].diameter) === 0 || isNaN(Number(cardArray[i].diameter))) {
                error = 'Введите корректные значения'
                break
            }
        }

        if (error.length) {
            event.preventDefault()
            setGeneralError(error)
        } else {
            const responseRegister = await axios.post('http://localhost:8081/api/v1/position', {
                positions: cardArray,
                pack: checkedPack
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setThirdStepRegister(true)
        }
    }

    return (
        <div>
            {!thirdStepRegister && <form onSubmit={submitHandler}>
                <h2 className='header-reg'>Введите незаполненные поля</h2>
                {pack &&
                    <div className='switchbar-reg'>
                        <p>Объединить в поддон:</p>
                        <label className='switch-reg'>
                            <input type='checkbox' checked={checkedPack} onChange={() => setCheckedPack(!checkedPack)}/>
                            <span className='slider round'></span>
                        </label>
                    </div>
                }
                {generalError && <h2 className='general-error-reg-two'>{generalError}</h2>}
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
                                                                  packs={packs}
                                                                  manufacturers={manufacturers}
                                                                  ulFocus={ulFocus}
                                                                  showAutocomplete={showAutocomplete}
                    />)}
                </div>
                <button type='submit' className='form-main-button-step-two'>Подтвердить</button>
            </form>}
            {thirdStepRegister && <RegisterStepThree/>}
        </div>
    )
}