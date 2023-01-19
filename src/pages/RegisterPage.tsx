import '../css/RegisterPage.css'
import React, {useState} from "react";
import {IPositionModel} from "../interfaces/exportedInterfaces";
import {useRegisterAutocomplete} from "../hooks/useRegisterAutocomplete";
import {ErrorMessage} from "../components/ErrorMessage";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {RegisterStepTwo} from "../components/RegisterStepTwo";
import {ModalWindow} from "../components/ModalWindow";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";

interface SelectFields {
    value: string,
    label: string
}

export function RegisterPage() {
    const {marks, packs, error, standards, manufacturers} = useRegisterAutocomplete()

    const [disabledDiameter, setDisabledDiameter] = useState(false)
    const [disabledPack, setDisabledPack] = useState(false)
    const [disabledHeat, setDisabledHeat] = useState(false)
    const [disabledPart, setDisabledPart] = useState(false)
    const [disabledWeight, setDisabledWeight] = useState(false)
    const [disabledManufacturer, setDisabledManufacturer] = useState(false)
    const [disabledComment, setDisabledComment] = useState(false)

    const [secondStepRegister, setSecondStepRegister] = useState(false)

    const [register, setRegister] = useState<IPositionModel>({
        mark: '',
        part: '',
        packing: '',
        plav: '',
        manufacturer: '',
        weight: 0,
        diameter: '',
        comment: '',
        standard: {
            mark: '',
            standards: []
        }
    })

    const [mark, setMark] = useState<string>('')
    const [part, setPart] = useState<string>('')
    const [packing, setPacking] = useState<string>('')
    const [plav, setPlav] = useState<string>('')
    const [manufacturer, setManufacturer] = useState<string>('')
    const [weight, setWeight] = useState<string>('')
    const [diameter, setDiameter] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [gost, setGost] = useState<SelectFields[]>([])
    const [quantity, setQuantity] = useState<number>(1)

    const [partDetails, setPartDetails] = useState({mark: '', plav: '', diameter: 0, packing: ''})

    const [quantityError, setQuantityError] = useState('')
    const [fieldsError, setFieldsError] = useState('')
    const [weightError, setWeightError] = useState('')
    const [diameterError, setDiameterError] = useState('')
    const [partError, setPartError] = useState('')
    const [axiosError, setAxiosError] = useState('')

    async function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setFieldsError('')
        setQuantityError('')
        setWeightError('')
        setDiameterError('')
        setPartError('')
        if (quantity === 0) {
            setQuantityError('Введите количество больше 0')
        } else if ((diameter === '' && !disabledDiameter) || (packing === '' && !disabledPack) ||
            (plav === '' && !disabledHeat) || (part === '' && !disabledPart) || (weight === '' && !disabledWeight) ||
            (manufacturer === '' && !disabledManufacturer)) {
            setFieldsError('Заполните пустые поля или заблокируйте их для заполнения на следующем шаге')
        } else if ((Number(weight) === 0 || isNaN(Number(weight))) && !disabledWeight) {
            setWeightError('Вес не может быть равен 0')
        } else if ((Number(diameter) === 0 || isNaN(Number(diameter))) && !disabledDiameter) {
            setDiameterError('Диаметр не может быть равен 0')
        } else {
            if (disabledPart) {
                let gostArray: string[] = []
                gost.map(gost => gostArray = [...gostArray, gost.label])
                setRegister({
                    mark: mark.trim(),
                    part: part.trim(),
                    packing: packing.trim(),
                    plav: plav.trim(),
                    manufacturer: manufacturer.trim(),
                    weight: Number(weight),
                    diameter: String(Number(diameter)),
                    comment: comment.trim(),
                    standard: {
                        mark: mark.trim(),
                        standards: gostArray
                    }
                })
                setSecondStepRegister(true)
            } else {
                try {
                    const response = await axios.post(BACKEND_URL + '/api/v1/registration/validate', {
                        part: part.trim(),
                        data: {
                            mark: mark.trim(),
                            plav: plav.trim(),
                            diameter: Number(diameter.trim()),
                            packing: packing.trim()
                        }
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    if (response.data.valid === true) {
                        let gostArray: string[] = []
                        gost.map(gost => gostArray = [...gostArray, gost.label])
                        setRegister({
                            mark: mark.trim(),
                            part: part.trim(),
                            packing: packing.trim(),
                            plav: plav.trim(),
                            manufacturer: manufacturer.trim(),
                            weight: Number(weight),
                            diameter: String(Number(diameter)),
                            comment: comment.trim(),
                            standard: {
                                mark: mark.trim(),
                                standards: gostArray
                            }
                        })
                        setSecondStepRegister(true)
                    } else {
                        setPartError('Невалидная партия')
                        setPartDetails(response.data.data)
                    }
                } catch (e: unknown) {
                    const error = e as AxiosError
                    setAxiosError('Ошибка соединения с сервером: ' + error.message)
                }
            }
        }
    }

    const [markAutocomplete, setMarkAutocomplete] = useState(false)
    const [packingAutocomplete, setPackingAutocomplete] = useState(false)
    const [manufacturerAutocomplete, setManufacturerAutocomplete] = useState(false)
    const [ulFocus, setUlFocus] = useState(false)
    const [options, setOptions] = useState<SelectFields[]>([])

    const animatedComponents = makeAnimated();

    function clickHandler(event: string, setState: (prop: string) => void, setFlag: (prop: boolean) => void) {
        setState(event)
        setFlag(false)
    }

    function showAutocomplete(input: string, items: string[], setState: (prop: string) => void,
                              setItemAutocomplete: (prop: boolean) => void, isMark: boolean,
                              ulClass: string, liClass: string, emClass: string) {
        if (items.filter((item) => item.toLowerCase().includes(input.toLowerCase())).length) {
            return (
                <ul className={ulClass}>
                    {items.filter((item) => item.toLowerCase().includes(input.toLowerCase()))
                        .map((item, index) =>
                            <li className={liClass} key={index} onMouseOver={() => setUlFocus(true)}
                                onMouseOut={() => setUlFocus(false)}
                                onClick={event => {
                                    if (isMark) {
                                        gostOptions(event.currentTarget.innerText)
                                        setGost([])
                                    }
                                    clickHandler(event.currentTarget.innerText, setState, setItemAutocomplete)
                                    setUlFocus(false)
                                }}>{item}</li>
                        )}
                </ul>
            )
        } else {
            return (
                <div className={emClass}>
                    <em>Нет элементов</em>
                </div>
            )
        }
    }

    function gostOptions(input: string) {
        const standard = standards.find(element => element.mark.toLowerCase() === input.toLowerCase())
        if (standard !== undefined) {
            let appropriateOptions: SelectFields[] = []
            standard.standards.map((string) => appropriateOptions = [...appropriateOptions, {
                value: string,
                label: string
            }])
            setOptions(appropriateOptions)
        } else {
            setOptions([])
        }
    }

    const [modal, setModal] = useState(false)

    return (
        <div>
            {modal && <ModalWindow openModal={setModal}/>}
            {!secondStepRegister &&
                <div className='margin-block'>
                    {partError &&
                        <div className='part-error-wrapper'>
                            <div className='part-error'>
                                <h3>Корректные поля для указанной партии</h3>
                                <p><span>Марка: </span>{partDetails.mark}</p>
                                <p><span>Плавка: </span>{partDetails.plav}</p>
                                <p><span>Диаметр: </span>{partDetails.diameter}</p>
                                <p><span>Упаковка: </span>{partDetails.packing}</p>
                            </div>
                        </div>}
                    <div className='register-block-button'>
                        <button className='add-standard-button' onClick={() => setModal(true)}>Добавить стандарт
                        </button>
                    </div>
                    <form className='register-block' onSubmit={submitHandler}>
                        {
                            error && <div>
                                <ErrorMessage error={error}/>
                                <h4 className='reg-error'>Автозаполнение не работает</h4>
                            </div>
                        }
                        {
                            axiosError && <div>
                                <ErrorMessage error={axiosError}/>
                            </div>
                        }
                        {fieldsError && <h4 className='reg-error'>{fieldsError}</h4>}
                        <div className='register-input'>
                            <label htmlFor="mark">Марка:</label>
                            <label htmlFor='mark' className='warn-label'>Обязательное поле</label>
                            <input type="text" name="" id="mark" value={mark}
                                   onChange={event => {
                                       const input: string = event.target.value
                                       setMark(input)
                                       setGost([])
                                       gostOptions(input)
                                   }}
                                   onFocus={() => setMarkAutocomplete(true)} onBlur={() => {
                                if (ulFocus) {
                                    return
                                } else {
                                    setMarkAutocomplete(false)
                                }
                            }} required/>
                            {mark !== '' && markAutocomplete && !error && showAutocomplete(mark, marks, setMark,
                                setMarkAutocomplete, true, 'suggestions-reg', 'suggestion-hoverable-reg', 'no-suggestions-reg')}
                        </div>
                        <div className='register-input'>
                            <Select placeholder='Выберите ГОСТ' isMulti id='gost' value={gost} name='gost'
                                    className='basic-multi-select'
                                    classNamePrefix='select' options={options} closeMenuOnSelect={false}
                                    components={animatedComponents} defaultValue={gost} required
                                    noOptionsMessage={() => 'Нет подходящих ГОСТов'} isClearable //@ts-ignore
                                    onChange={setGost}/>
                        </div>
                        <div className='register-input'>
                            <button className='lock-btn' onClick={(event) => {
                                event.preventDefault()
                                setDisabledDiameter(!disabledDiameter)
                                setDiameter('')
                            }}>Заблокировать поле
                            </button>
                            <label htmlFor="diameter">Диаметр:</label>
                            {diameterError && <label htmlFor="diameter" className='error-label'>{diameterError}</label>}
                            <input type="text" name="" id="diameter" value={diameter} disabled={disabledDiameter}
                                   onChange={event => setDiameter(event.target.value.replace(/[^.1234567890]+/g, ''))}/>
                        </div>
                        <div className='register-input'>
                            <button className='lock-btn' onClick={(event) => {
                                event.preventDefault()
                                setDisabledPack(!disabledPack)
                                setPacking('')
                            }}>Заблокировать поле
                            </button>
                            <label htmlFor="package">Упаковка:</label>
                            <input type="text" name="" id="package" disabled={disabledPack} value={packing}
                                   onChange={event => setPacking(event.target.value)}
                                   onFocus={() => setPackingAutocomplete(true)} onBlur={() => {
                                if (ulFocus) {
                                    return
                                } else {
                                    setPackingAutocomplete(false)
                                }
                            }}/>
                            {packing !== '' && packingAutocomplete && !error && showAutocomplete(packing, packs, setPacking,
                                setPackingAutocomplete, false, 'suggestions-reg', 'suggestion-hoverable-reg', 'no-suggestions-reg')}
                        </div>
                        <div className='register-input'>
                            <button className='lock-btn' onClick={(event) => {
                                event.preventDefault()
                                setDisabledHeat(!disabledHeat)
                                setPlav('')
                            }}>Заблокировать поле
                            </button>
                            <label htmlFor="heat">Плавка:</label>
                            <input type="text" name="" id="heat" disabled={disabledHeat} value={plav}
                                   onChange={event => setPlav(event.target.value)}/>
                        </div>
                        <div className='register-input'>
                            <button className='lock-btn' onClick={(event) => {
                                event.preventDefault()
                                setDisabledPart(!disabledPart)
                                setPart('')
                            }}>Заблокировать поле
                            </button>
                            <label htmlFor="part">Партия:</label>
                            {partError && <label htmlFor="part" className='error-label'>{partError}</label>}
                            <input type="text" name="" id="part" value={part}
                                   onChange={event => setPart(event.target.value)}
                                   disabled={disabledPart}/>
                        </div>
                        <div className='register-input'>
                            <button className='lock-btn' onClick={(event) => {
                                event.preventDefault()
                                setDisabledWeight(!disabledWeight)
                                setWeight('')
                            }}>Заблокировать поле
                            </button>
                            <label htmlFor="weight">Вес:</label>
                            {weightError && <label htmlFor="weight" className='error-label'>{weightError}</label>}
                            <input type="text" name="" id="weight" value={weight}
                                   onChange={event => setWeight(event.target.value.replace(/[^.1234567890]+/g, ''))}
                                   disabled={disabledWeight}/>
                        </div>
                        <div className='register-input'>
                            <button className='lock-btn' onClick={(event) => {
                                event.preventDefault()
                                setDisabledManufacturer(!disabledManufacturer)
                                setManufacturer('')
                            }}>Заблокировать поле
                            </button>
                            <label htmlFor="manufacturer">Производитель:</label>
                            <input type="text" name="" id="manufacturer" value={manufacturer}
                                   disabled={disabledManufacturer}
                                   onChange={event => setManufacturer(event.target.value)}
                                   onFocus={() => setManufacturerAutocomplete(true)}
                                   onBlur={() => {
                                       if (ulFocus) {
                                           return
                                       } else {
                                           setManufacturerAutocomplete(false)
                                       }
                                   }}/>
                            {manufacturer !== '' && !error && manufacturerAutocomplete && showAutocomplete(manufacturer,
                                manufacturers, setManufacturer, setManufacturerAutocomplete, false,
                                'suggestions-reg', 'suggestion-hoverable-reg', 'no-suggestions-reg')}
                        </div>
                        <div className='register-input-quantity'>
                            {quantityError && <h4 className='reg-error'>{quantityError}</h4>}
                            <label htmlFor="quantity">Количество:</label>
                            <div className='quantity-input-buttons'>
                                <input type="text" name="" id="quantity" value={quantity}
                                       onChange={event => setQuantity(Number(event.target.value.replace(/[^1234567890]+/g, '')))}
                                       required/>
                                <div className='form-btns'>
                                    <button className='form-btn' onClick={(event) => {
                                        event.preventDefault()
                                        setQuantity(quantity + 1)
                                    }}>+
                                    </button>
                                    <button className='form-btn' onClick={(event) => {
                                        event.preventDefault()
                                        if (quantity <= 1) {
                                            return
                                        } else {
                                            setQuantity(quantity - 1)
                                        }
                                    }}>-
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='register-input-textarea'>
                            <button className='lock-btn-comment' onClick={(event) => {
                                event.preventDefault()
                                setDisabledComment(!disabledComment)
                                setComment('')
                            }}>Заблокировать поле
                            </button>
                            <label htmlFor="comment">Комментарий:</label>
                            <label htmlFor='comment' className='comment-add-info'>Можно оставить пустым или
                                заблокировать для заполнения на следующем шаге</label>
                            <textarea name="" id="comment" cols={Number("45")} rows={Number("4")}
                                      disabled={disabledComment}
                                      value={comment} onChange={event => setComment(event.target.value)}/>
                        </div>
                        <button type='submit' className='form-main-button'>Зарегистрировать</button>
                    </form>
                </div>
            }
            {secondStepRegister &&
                <RegisterStepTwo quantity={quantity} diameterBlock={disabledDiameter} plavBlock={disabledHeat}
                                 partBlock={disabledPart} commentBlock={disabledComment}
                                 manufacturerBlock={disabledManufacturer}
                                 packageBlock={disabledPack} weightBlock={disabledWeight} registerProp={register}
                                 setRegisterProp={setRegister} packs={packs} manufacturers={manufacturers}
                                 ulFocus={ulFocus} showAutocomplete={showAutocomplete}/>
            }
        </div>
    )
}