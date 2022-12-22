import '../css/RegisterPage.css'
import React, {useState} from "react";
import {IPositionModel} from "../interfaces/exportedInterfaces";
import {useRegisterAutocomplete} from "../hooks/useRegisterAutocomplete";
import {ErrorMessage} from "../components/ErrorMessage";
import Select, {ActionMeta, GroupBase, Options, Props} from 'react-select'
import makeAnimated from 'react-select/animated'
import {RegisterStepTwo} from "../components/RegisterStepTwo";

interface SelectFields {
    value: string,
    label: string
}

export function RegisterPage() {
    const {marks, packs, error, standards, manufacturers} = useRegisterAutocomplete()

    // const [disabledMarks, setDisabledMarks] = useState(false)
    // const [disabledGost, setDisabledGost] = useState(false)
    const [disabledDiameter, setDisabledDiameter] = useState(false)
    const [disabledPack, setDisabledPack] = useState(false)
    const [disabledHeat, setDisabledHeat] = useState(false)
    const [disabledPart, setDisabledPart] = useState(false)
    const [disabledWeight, setDisabledWeight] = useState(false)
    const [disabledManufacturer, setDisabledManufacturer] = useState(false)
    const [disabledComment, setDisabledComment] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

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

    const [quantityError, setQuantityError] = useState('')
    const [fieldsError, setFieldsError] = useState('')

    function submitHandler(event: { preventDefault: () => void; }) {
        setFieldsError('')
        setQuantityError('')
        if (quantity === 0) {
            event.preventDefault()
            setQuantityError('Введите количество больше 0')
        } else if ((diameter === '' && !disabledDiameter) || (packing === '' && !disabledPack) ||
            (plav === '' && !disabledHeat) || (part === '' && !disabledPart) || (weight === '' && !disabledWeight) ||
            (manufacturer === '' && !disabledManufacturer) || (comment === '' && !disabledComment)) {
            event.preventDefault()
            setFieldsError('Заполните пустые поля или заблокируйте их для заполнения на следующем шаге')
        } else {
            let gostArray: string[] = []
            gost.map(gost => gostArray = [...gostArray, gost.label])
            setRegister({
                mark: mark,
                part: part,
                packing: packing,
                plav: plav,
                manufacturer: manufacturer,
                weight: Number(weight),
                diameter: diameter,
                comment: comment,
                standard: {
                    mark: mark,
                    standards: gostArray
                }
            })
            setSecondStepRegister(true)
        }
    }

    const [markAutocomplete, setMarkAutocomplete] = useState(false)
    const [packingAutocomplete, setPackingAutocomplete] = useState(false)
    // const [gostAutocomplete, setGostAutocomplete] = useState(false)
    const [manufacturerAutocomplete, setManufacturerAutocomplete] = useState(false)
    const [ulFocus, setUlFocus] = useState(false)
    const [options, setOptions] = useState<SelectFields[]>([])

    const animatedComponents = makeAnimated();

    // const [active, setActive] = useState(0)

    // function onKeyDownHandler(event: { keyCode: number; }) {
    //     if (event.keyCode === 13) {
    //         setMark(marks[active])
    //     }
    //
    //     if (event.keyCode === 38) {
    //         if (active === 0) {
    //             return
    //         }
    //         setActive(active - 1)
    //     }
    //
    //     if (event.keyCode === 40) {
    //         if (active === marks.length) {
    //             return
    //         }
    //         setActive(active + 1)
    //     }
    // }

    function clickHandler(event: string, setState: (prop: string) => void, setFlag: (prop: boolean) => void) {
        setState(event)
        setFlag(false)
    }

    // function showStandardAutocomplete(input: string, setState: (prop: string) => void, setItemAutocomplete: (prop: boolean) => void) {
    //     if (standards.filter(standard => standard.mark === mark)
    //         .filter(standard => standard.standards
    //             .filter(str => str.toLowerCase().includes(input.toLowerCase())).length).length) {
    //         return (
    //             <ul className='suggestions-reg'>
    //                 {standards.filter(standard => standard.mark === mark)
    //                     .map(standard => standard.standards.filter(string => string.toLowerCase().includes(input.toLowerCase())).map(string => {
    //                             return (
    //                                 <li className='suggestion-hoverable-reg' onMouseOver={() => setUlFocus(true)}
    //                                     onMouseOut={() => setUlFocus(false)}
    //                                     onClick={event => {
    //                                         clickHandler(event.currentTarget.innerText, setState, setItemAutocomplete)
    //                                         setUlFocus(false)
    //                                     }}>{string}</li>
    //                             )
    //                         }
    //                     ))}
    //             </ul>
    //         )
    //     } else {
    //         return (
    //             <div className='no-suggestions-reg'>
    //                 <em>Нет элементов</em>
    //             </div>
    //         )
    //     }
    // }

    // function showStandardAutocomplete() {
    //     if (standards.filter(standard => standard.mark === mark)) {
    //         return (
    //             <div>
    //                 {standards.filter(standard => standard.mark === mark).map(standard => standard.standards.map(string => {
    //                     return (
    //                         <option value="string" className='suggestion-hoverable-reg'
    //                                 onClick={() => setGost(string)}>{string}</option>
    //                     )
    //                 }))
    //                 }
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className='no-suggestions-reg'>
    //                 <em>Нет элементов</em>
    //             </div>
    //         )
    //     }
    // }

    function showAutocomplete(input: string, items: string[], setState: (prop: string) => void, setItemAutocomplete: (prop: boolean) => void, isMark: boolean) {
        if (items.filter((item) => item.toLowerCase().includes(input.toLowerCase())).length) {
            return (
                <ul className="suggestions-reg">
                    {items.filter((item) => item.toLowerCase().includes(input.toLowerCase()))
                        .map((item, index) =>
                            <li className='suggestion-hoverable-reg' key={index} onMouseOver={() => setUlFocus(true)}
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
                <div className='no-suggestions-reg'>
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

    // const options = [
    // {value: 'a', label: 'aaa'},
    // {value: 'b', label: 'bbb'},
    // {value: 'c', label: 'ccc'}
    // ]

    // function setOptions(): string[] {
    //     let options: string[] = []
    //     {standards.filter(standard => standard.mark === mark).map(standard => standard.standards.map(string => options.push(string)))}
    //     return options
    // }

    // function check() {
    //     return (
    //         <div>
    //             {options.map(string => <Option label={string} isSelected={false} setValue={(newValue, action) => action(newValue)}>
    //
    //             </Option>)}
    //         </div>
    // )
    // }

    // function CustomSelect<
    //     Option,
    //     IsMulti extends boolean = false,
    //     Group extends GroupBase<Option> = GroupBase<Option>
    //     >(props: Props<Option, IsMulti, Group>) {
    //     console.log(gost)
    //     return (
    //         <Select {...props} theme={(theme) => ({ ...theme, borderRadius: 0 })} />
    //     );
    // }


    return (
        <div>
            {!secondStepRegister &&
                <form className='register-block' onSubmit={submitHandler}>
                    {
                        error && <div>
                            <ErrorMessage error={error}/>
                            <h4 className='reg-error'>Автозаполнение не работает</h4>
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
                               }
                               }
                               onFocus={() => setMarkAutocomplete(true)} onBlur={() => {
                            if (ulFocus) {
                                return
                            } else {
                                setMarkAutocomplete(false)
                            }
                        }} required/>
                        {mark !== '' && markAutocomplete && !error && showAutocomplete(mark, marks, setMark, setMarkAutocomplete, true)}
                    </div>
                    <div className='register-input'>
                        <Select placeholder='Выберите ГОСТ' isMulti id='gost' value={gost} name='gost'
                                className='basic-multi-select'
                                classNamePrefix='select' options={options} closeMenuOnSelect={false}
                                components={animatedComponents} defaultValue={gost} required
                                noOptionsMessage={() => 'Нет подходящих ГОСТов'} isClearable //@ts-ignore
                                onChange={setGost}/>
                        {/*<Select placeholder='Выберите ГОСТ' isMulti id='gost' name='gost' className='basic-multi-select'*/}
                        {/*        classNamePrefix='select' options={options} closeMenuOnSelect={false}*/}
                        {/*        components={animatedComponents} defaultValue={gost} />*/}
                        {/*<select name="" id="gost" value={gost}>*/}
                        {/*    {standards.filter(standard => standard.mark === mark).map(standard => standard.standards.map(string =>*/}
                        {/*        <option value="string" onClick={() => setGost(string)}>{string}</option>))}*/}
                        {/*</select>*/}
                        {/*<input type="text" name="" id="gost" disabled={disabledGost} value={gost}*/}
                        {/*       onChange={event => setGost(event.target.value)}*/}
                        {/*       onFocus={() => setGostAutocomplete(true)} onBlur={() => {*/}
                        {/*    if (ulFocus) {*/}
                        {/*        return*/}
                        {/*    } else {*/}
                        {/*        setGostAutocomplete(false)*/}
                        {/*    }*/}
                        {/*}}/>*/}
                    </div>
                    <div className='register-input'>
                        <button className='lock-btn' onClick={(event) => {
                            event.preventDefault()
                            setDisabledDiameter(!disabledDiameter)
                            setDiameter('')
                        }}>Заблокировать поле
                        </button>
                        <label htmlFor="diameter">Диаметр:</label>
                        <input type="text" name="" id="diameter" value={diameter} disabled={disabledDiameter}
                               onChange={event => setDiameter(event.target.value)}/>
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
                        {packing !== '' && packingAutocomplete && !error && showAutocomplete(packing, packs, setPacking, setPackingAutocomplete, false)}
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
                        {manufacturer !== '' && !error && manufacturerAutocomplete && showAutocomplete(manufacturer, manufacturers, setManufacturer, setManufacturerAutocomplete, false)}
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
                        <textarea name="" id="comment" cols={Number("45")} rows={Number("4")} disabled={disabledComment}
                                  value={comment} onChange={event => setComment(event.target.value)}/>
                    </div>
                    <button type='submit' className='form-main-button' disabled={buttonDisabled}>Зарегистрировать
                    </button>
                </form>
            }
            {secondStepRegister &&
                <RegisterStepTwo quantity={quantity} diameterBlock={disabledDiameter} plavBlock={disabledHeat}
                                 partBlock={disabledPart} commentBlock={disabledComment}
                                 manufacturerBlock={disabledManufacturer}
                                 packageBlock={disabledPack} weightBlock={disabledWeight} registerProp={register}
                                 setRegisterProp={setRegister}/>
            }
        </div>
    )
}