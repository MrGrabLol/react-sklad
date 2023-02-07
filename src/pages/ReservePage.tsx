import {useReserves} from "../hooks/useReserves";
import {Reserve} from "../components/Reserve";
import {Loader} from "../components/Loader";
import '../css/ReservePage.css'
import {useState} from "react";
import {ModalWindowReserveCreate} from "../components/ModalWindowReserveCreate";


export function ReservePage() {
    const {reserves, error, loader} = useReserves()

    const [modal, setModal] = useState(false)

    return (
        <div style={{marginTop: '110px'}}>
            {modal && <ModalWindowReserveCreate openModal={setModal}/>}
            {error && <h2 style={{color: 'red'}}>Ошибка: {error}</h2>}
            {loader && <Loader/>}
            {!error && !loader &&
                <div>
                    <button className='reserve-button' onClick={() => setModal(true)}>Добавить резерв</button>
                    <div className='card-container-reg'>
                        {reserves.map(reserve => <Reserve reserve={reserve}/>)}
                    </div>
                </div>
            }
        </div>
    )
}