import {ModalWindowProps} from "./ModalWindowAddStandard";
import ReactDom from "react-dom";
import React, {useState} from "react";
import '../css/ModalWindowAddUser.css'
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "../ConstConfig";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {SelectFields} from "../pages/RegisterPage";

export function ModalWindowAddUser({openModal}: ModalWindowProps) {

    const portalElement: HTMLElement = document.getElementById('portal')!

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [role, setRole] = useState<SelectFields[]>([])
    const [warehouse, setWarehouse] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const options: SelectFields[] = [
        {value: 'SELLER', label: 'SELLER'},
        {value: 'WAREHOUSE_USER', label: 'WAREHOUSE_USER'},
        {value: 'ADMIN', label: 'ADMIN'}
    ]

    async function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setError('')
        if (warehouse === '' && role.filter(r => r.value === 'WAREHOUSE_USER').length >= 1) {
            setError('Выберите склад')
        } else {
            let roles: string[] = []
            role.map(r => roles = [...roles, r.value])
            try {
                const response = await axios.post(BACKEND_URL + '/api/v1/admin/worker', {
                    username: login,
                    password: password,
                    location: roles.includes('WAREHOUSE_USER') ? warehouse : null,
                    first_name: name,
                    last_name: surname,
                    roles: roles
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                if (response.status === 200) {
                    window.location.reload()
                }
            } catch (e: unknown) {
                const error = e as AxiosError
                setError(error.message)
            }
        }
    }

    const animatedComponents = makeAnimated();

    return ReactDom.createPortal(
        <form className='modalWindow' onSubmit={submitHandler}>
            <div className='modalBackground' onClick={() => openModal(false)}/>
            <div className='modalContainerReserve' style={{width: '52%', height: '60%'}}>
                <div className='titleCloseBtn'>
                    <button type='button' id='closeBtn' onClick={() => openModal(false)}>X</button>
                </div>
                <div className='titleReserve'>
                    <h1>Добавление пользователя</h1>
                </div>
                <div className='body'>
                    {error && <h4 style={{color: 'red', margin: '0'}}>{error}</h4>}
                    <div className='reserve-input-container'>
                        <div className='modalInputReserve'>
                            <label htmlFor="" className='reserve-label'>Логин</label>
                            <input type="text" value={login} className='modal-window-add-user-input'
                                   onChange={event => setLogin(event.target.value)} required/>
                        </div>
                        <div className='modalInputReserve'>
                            <label htmlFor="" className='reserve-label'>Пароль</label>
                            <input type="text" value={password} className='modal-window-add-user-input'
                                   onChange={event => setPassword(event.target.value)} required/>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserve'>
                            <label htmlFor="" className='reserve-label'>Имя</label>
                            <input type="text" value={name} className='modal-window-add-user-input'
                                   onChange={event => setName(event.target.value)} required/>
                        </div>
                        <div className='modalInputReserve'>
                            <label htmlFor="" className='reserve-label'>Фамилия</label>
                            <input type="text" value={surname} className='modal-window-add-user-input'
                                   onChange={event => setSurname(event.target.value)} required/>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        <div className='modalInputReserve'>
                            {/*<label htmlFor="role" className='reserve-label' style={{marginBottom: '80px'}}>Роль</label>*/}
                            <Select placeholder='Роль пользователя' isMulti id='role' value={role} name='gost'
                                    className='basic-multi-select'
                                    classNamePrefix='select' options={options} closeMenuOnSelect={false}
                                    components={animatedComponents} defaultValue={role} required
                                    noOptionsMessage={() => 'Нет такой роли'} isClearable //@ts-ignore
                                    onChange={setRole}/>
                        </div>
                    </div>
                    <div className='reserve-input-container'>
                        {
                            (role.filter(r => r.value === 'WAREHOUSE_USER').length >= 1) &&
                            <div className='modalInputReserveFull'>
                                <label htmlFor="" className='reserve-label'>Склад</label>
                                <div className='triple-switch-container'>
                                    <div className='triple-switch' id='location' style={{marginTop: '8px'}}>
                                    <span id='span-one' className='item-notclicked' onClick={() => {
                                        setWarehouse('BelSklad')
                                        const element1 = document.getElementById('span-one')!
                                        const element2 = document.getElementById('span-two')!
                                        const element3 = document.getElementById('span-three')!
                                        element1.classList.add('item-clicked')
                                        element2.classList.remove('item-clicked')
                                        element3.classList.remove('item-clicked')
                                    }}><label>Белорецк</label></span>
                                        <span id='span-two' className='item-notclicked' onClick={() => {
                                            setWarehouse('Solnechnogorsk')
                                            const element1 = document.getElementById('span-one')!
                                            const element2 = document.getElementById('span-two')!
                                            const element3 = document.getElementById('span-three')!
                                            element2.classList.add('item-clicked')
                                            element1.classList.remove('item-clicked')
                                            element3.classList.remove('item-clicked')
                                        }}><label>Солнечногорск</label></span>
                                        <span id='span-three' className='item-notclicked' onClick={() => {
                                            setWarehouse('Manufacture')
                                            const element1 = document.getElementById('span-one')!
                                            const element2 = document.getElementById('span-two')!
                                            const element3 = document.getElementById('span-three')!
                                            element3.classList.add('item-clicked')
                                            element2.classList.remove('item-clicked')
                                            element1.classList.remove('item-clicked')
                                        }}><label>Производство</label></span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='footer'>
                    <button type='button' id='cancelBtn' onClick={() => openModal(false)}>Отменить</button>
                    <button type='submit' id='confirmBtn'>Добавить</button>
                </div>
            </div>
        </form>, portalElement
    )
}