import {IPositionModel} from "../interfaces/exportedInterfaces";
import '../css/CardRegister.css'
import '../css/RegisterPage.css'
import React, {useState} from "react";
import {BACKEND_URL} from "../ConstConfig";
import axios, {AxiosError} from "axios";

interface CardRegisterProps {
    card: IPositionModel,
    diameterBlock: boolean,
    packageBlock: boolean,
    plavBlock: boolean,
    partBlock: boolean,
    weightBlock: boolean,
    manufacturerBlock: boolean,
    commentBlock: boolean,
    registerProp: IPositionModel
    setRegisterProp: (prop: IPositionModel) => void
    arrayIndex: number,
    mainArray: IPositionModel[],
    packs: string[],
    manufacturers: string[],
    ulFocus: boolean,
    validArray: boolean[],
    showAutocomplete: (prop1: string, prop2: string[], prop3: (prop: string) => void, prop4: (prop: boolean) => void,
                       prop5: boolean, prop6: string, prop7: string, prop8: string) => JSX.Element,
}

export function CardRegister({
                                 card,
                                 diameterBlock,
                                 packageBlock,
                                 plavBlock,
                                 partBlock,
                                 weightBlock,
                                 manufacturerBlock,
                                 commentBlock,
                                 arrayIndex,
                                 mainArray,
                                 packs,
                                 manufacturers,
                                 ulFocus,
                                 showAutocomplete,
                                 validArray
                             }: CardRegisterProps) {

    const [customDiameter, setCustomDiameter] = useState<string>(String(mainArray[arrayIndex].diameter))
    const [customPacking, setCustomPacking] = useState<string>(mainArray[arrayIndex].packing)
    const [customPart, setCustomPart] = useState<string>(mainArray[arrayIndex].part)
    const [customPlav, setCustomPlav] = useState<string>(mainArray[arrayIndex].plav)
    const [customWeight, setCustomWeight] = useState<string>(() => {
        if (mainArray[arrayIndex].weight === 0) {
            return ''
        } else {
            return String(mainArray[arrayIndex].weight)
        }
    })
    const [customManufacturer, setCustomManufacturer] = useState<string>(mainArray[arrayIndex].manufacturer)
    const [customComment, setCustomComment] = useState<string>(mainArray[arrayIndex].comment)
    const [customPackingBoolean, setCustomPackingBoolean] = useState(false)
    const [customManufacturerBoolean, setCustomManufacturerBoolean] = useState(false)

    const [requestError, setRequestError] = useState('')
    const [partError, setPartError] = useState('')
    const [partAccept, setPartAccept] = useState('')
    const [partCheck, setPartCheck] = useState({valid: true, data: {mark: '', plav: '', diameter: '', packing: ''}})

    async function checkPart() {
        setPartError('')
        setPartAccept('')
        setRequestError('')
        validArray[arrayIndex] = false
        try {
            const response = await axios.post(BACKEND_URL + '/api/v1/registration/validate', {
                part: customPart,
                data: {
                    mark: card.mark,
                    plav: customPlav,
                    diameter: Number(customDiameter).toFixed(2),
                    packing: customPacking
                }
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setPartCheck(response.data)
            if (response.data.valid === true) {
                setPartAccept('партия валидна')
                validArray[arrayIndex] = true
            } else {
                setPartCheck(response.data)
                setPartError('некорректная партия')
                validArray[arrayIndex] = false
            }
        } catch (e: unknown) {
            setRequestError('ошибка сервера')
            validArray[arrayIndex] = false
        }
    }

    mainArray[arrayIndex].diameter = Number(customDiameter)
    mainArray[arrayIndex].packing = customPacking.trim()
    mainArray[arrayIndex].part = customPart.trim()
    mainArray[arrayIndex].plav = customPlav.trim()
    mainArray[arrayIndex].weight = Number(customWeight)
    mainArray[arrayIndex].manufacturer = customManufacturer.trim()
    mainArray[arrayIndex].comment = customComment.trim()

    return (
        <div className='card-item-reg'>
            <p className='card-item__title-reg'>{card.mark}</p>
            <div className='input-block-step-two'>
                <p className='card-item__text-reg'><span
                    className='span-reg'>Стандарты: </span>{card.standard.standards.join(', ')}</p>
            </div>
            <div className='input-block-step-two'>
                <p className='card-item__text-reg'><span
                    className='span-reg'>Диаметр: </span>{!diameterBlock && card.diameter}</p>
                {diameterBlock &&
                    <input type="text" id='diameter-two' value={customDiameter}
                           onChange={event => setCustomDiameter(event.target.value.replace(/[^.1234567890]+/g, ''))}
                           required
                           onFocus={() => {
                               validArray[arrayIndex] = false
                               setPartError('')
                               setPartAccept('')
                           }}
                           onBlur={() => {
                               if (customPart !== '') {
                                   checkPart()
                               }
                           }}/>
                }
            </div>
            <div className='input-block-step-two'>
                <p className='card-item__text-reg'><span
                    className='span-reg'>Упаковка: </span>{!packageBlock && card.packing}</p>
                {packageBlock &&
                    <div>
                        <input type="text" value={customPacking} onChange={event => setCustomPacking(event.target.value)}
                               required
                               onFocus={() => {
                                   setCustomPackingBoolean(true)
                                   validArray[arrayIndex] = false
                                   setPartError('')
                                   setPartAccept('')
                               }}
                               onBlur={() => {
                                   if (ulFocus) {
                                       return
                                   } else {
                                       setCustomPackingBoolean(false)
                                       if (customPart !== '') {
                                           checkPart()
                                       }
                                   }
                               }}/>
                        {customPacking !== '' && customPackingBoolean && showAutocomplete(customPacking, packs, setCustomPacking, setCustomPackingBoolean, false,
                            'suggestions-reg-two', 'suggestion-hoverable-reg-two', 'no-suggestions-reg-two')}
                    </div>

                }
            </div>
            <div className='input-block-step-two'>
                <p className='card-item__text-reg'><span className='span-reg'>Партия: </span>
                    {!partBlock && card.part}
                    <span style={{color: 'green'}}> {partAccept}</span>
                    <span style={{color: 'red'}}> {partError}</span>
                    <span style={{color: 'red'}}> {requestError}</span>
                </p>
                {partBlock &&
                    <input type="text" value={customPart} onChange={event => setCustomPart(event.target.value)}
                           onBlur={() => {
                               if (customPart !== '') {
                                   checkPart()
                               }
                           }}
                           onFocus={() => {
                               validArray[arrayIndex] = false
                               setPartError('')
                               setPartAccept('')
                           }} required/>
                }
            </div>
            <div className='input-block-step-two'>
                <p className='card-item__text-reg'><span className='span-reg'>Плавка: </span>{!plavBlock && card.plav}
                </p>
                {plavBlock &&
                    <input type="text" value={customPlav} onChange={event => setCustomPlav(event.target.value)}
                           onBlur={() => {
                               if (customPart !== '') {
                                   checkPart()
                               }
                           }}
                           onFocus={() => {
                               validArray[arrayIndex] = false
                               setPartError('')
                               setPartAccept('')
                           }} required/>
                }
            </div>
            <div className='input-block-step-two'>
                <p className='card-item__text-reg'><span className='span-reg'>Вес: </span>{!weightBlock && card.weight}
                </p>
                {weightBlock &&
                    <input type="text" id='weight-two' value={customWeight}
                           onChange={event => setCustomWeight(event.target.value.replace(/[^.1234567890]+/g, ''))}
                           required/>
                }
            </div>
            <div className='input-block-step-two'>
                <p className='card-item__text-reg'><span
                    className='span-reg'>Производитель: </span>{!manufacturerBlock && card.manufacturer}</p>
                {manufacturerBlock &&
                    <div>
                        <input type="text" value={customManufacturer}
                               onChange={event => setCustomManufacturer(event.target.value)} required
                               onFocus={() => setCustomManufacturerBoolean(true)}
                               onBlur={() => {
                                   if (ulFocus) {
                                       return
                                   } else {
                                       setCustomManufacturerBoolean(false)
                                   }
                               }}/>
                        {customManufacturer !== '' && customManufacturerBoolean && showAutocomplete(customManufacturer,
                            manufacturers, setCustomManufacturer, setCustomManufacturerBoolean, false,
                            'suggestions-reg-two', 'suggestion-hoverable-reg-two', 'no-suggestions-reg-two')}
                    </div>
                }
            </div>
            <div className='input-block-step-two'>
                <p className='card-item__text-reg'><span className='span-reg'>Комментарий: </span>{!commentBlock && card.comment}</p>
                {commentBlock &&
                    <input type="text" value={customComment} onChange={event => setCustomComment(event.target.value)}/>
                }
            </div>
        </div>
    )
}