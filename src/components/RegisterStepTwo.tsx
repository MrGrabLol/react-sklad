import {IPositionModel, IRegisterResponse} from "../interfaces/exportedInterfaces";
import {CardRegister} from "./CardRegister";
import React, {useState} from "react";
import axios, {AxiosError} from "axios";
import {RegisterStepThree} from "./RegisterStepThree";
import {BACKEND_URL} from "../ConstConfig";

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

    const [cardArray] = useState<IPositionModel[]>(() => {
        let tempArray: IPositionModel[] = []
        for (let i = 0; i < quantity; i++) {
            tempArray = [...tempArray, {...registerProp}]
        }
        return tempArray
    })
    const [generalError, setGeneralError] = useState('')
    const [packView] = useState(() => {
        return !diameterBlock && !packageBlock && !partBlock && !plavBlock && !manufacturerBlock && quantity > 1;
    })
    const [packPrint, setPackPrint] = useState(() => {
        return packView;
    })
    const [thirdStepRegister, setThirdStepRegister] = useState(false)
    const [registerResponse, setRegisterResponse] = useState<IRegisterResponse>({
        positions: [], pack: {
            id: 0, mark: '', diameter: '', packing: '', date: '', comment: '', part: '', plav: '', manufacturer: '',
            weight: '', status: '', location: '', type: '', standards: [], positions: []
        }
    })
    const [validArray] = useState<boolean[]>(() => {
        let tempArray: boolean[] = []
        for (let i = 0; i < quantity; i++) {
            tempArray = [...tempArray, false]
        }
        return tempArray
    })

    async function submitHandler(event: { preventDefault: () => void; }) {
        console.log('-----first part-----')
        event.preventDefault()
        setGeneralError('')
        console.log('error is empty')

        let error = ''
        for (let i = 0; i < quantity; i++) {
            if (cardArray[i].weight === 0 || isNaN(cardArray[i].weight) || Number(cardArray[i].diameter) === 0 || isNaN(Number(cardArray[i].diameter))) {
                console.log('incorrect fields')
                error = 'Введите корректные значения'
                break
            }
        }

        console.log('-------checked fields--------')
        console.log('bool array current state: ', validArray)

        if (partBlock || plavBlock || diameterBlock || packageBlock) {
            for (let i = 0; i < quantity; i++) {
                if (!validArray[i]) {
                    console.log('incorrect part details')
                    error = 'Ошибка валидации партии у некоторых карточек'
                    break
                }
            }
        }

        console.log('------checked part valid-------')

        if (error.length) {
            setGeneralError(error)
            console.log('error has length')
        } else {
            console.log('error is empty in try block')
            try {
                const response = await axios.post(BACKEND_URL + '/api/v1/registration', {
                    positions: cardArray,
                    pack: packPrint
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                setRegisterResponse(response.data)
                setThirdStepRegister(true)
            } catch (e: unknown) {
                const requestError = e as AxiosError
                setGeneralError('Ошибка сервера: ' + requestError.message + ', повторите попытку позже')
            }
        }
    }

    return (
        <div>
            {!thirdStepRegister && <form onSubmit={submitHandler}>
                <h2 className='header-reg'>Введите незаполненные поля</h2>
                {packView &&
                    <div className='switchbar-reg'>
                        <p>Объединить в поддон:</p>
                        <label className='switch-reg'>
                            <input type='checkbox' checked={packPrint} onChange={() => setPackPrint(!packPrint)}/>
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
                                                                  validArray={validArray}
                    />)}
                </div>
                <button type='submit' className='form-main-button-step-two'>Подтвердить</button>
            </form>}
            {thirdStepRegister && !generalError && <RegisterStepThree registerResponse={registerResponse} packPrint={packPrint}/>}
        </div>
    )
}