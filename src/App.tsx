import React from 'react';
import {LoginPage} from "./pages/LoginPage";
import {Route, Routes} from "react-router-dom";
import icon from "./assets/logo_new_v2.png";
import {Navigation} from "./components/Navigation";
import {RegisterPage} from "./pages/RegisterPage";
import {ShowPage} from "./pages/ShowPage";
import {SearchPage} from "./pages/SearchPage";
import {MeltSearchPage} from "./pages/MeltSearchPage";
import {CombinePage} from "./pages/CombinePage";
import {ShipmentPage} from "./pages/ShipmentPage";
import {ShipmentHistoryPage} from "./pages/ShipmentHistoryPage";
import {AdmissionPage} from "./pages/AdmissionPage";
import SendPage from "./pages/SendPage";
import './css/app.css'
import useToken from "./hooks/useToken";

function App() {
    const {token, setToken} = useToken()

    if (!token) {
        return <LoginPage setToken={setToken}/>
    }

    const clickHandler = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    return (
        <>
            <div className='container'>
                <div className='sidebar'>
                    <img className='image' src={icon} alt="Солнечногорск. Ферротрейд"/>
                    <Navigation/>
                </div>
                <div className='mainbar'>
                    <button className='btn-exit' onClick={clickHandler} >Выйти</button>
                        <Routes>
                            <Route path='/sklad/register' element={<RegisterPage></RegisterPage>}></Route>
                            <Route path='/sklad/show'
                                   element={<ShowPage token={token}/>}></Route>
                            <Route path='/sklad/search' element={<SearchPage token={token}/>}></Route>
                            <Route path='/sklad/melt-search' element={<MeltSearchPage></MeltSearchPage>}></Route>
                            <Route path='/sklad/combine' element={<CombinePage></CombinePage>}></Route>
                            <Route path='/sklad/shipment' element={<ShipmentPage></ShipmentPage>}></Route>
                            <Route path='/sklad/shipment-history'
                                   element={<ShipmentHistoryPage></ShipmentHistoryPage>}></Route>
                            <Route path='/sklad/admission' element={<AdmissionPage></AdmissionPage>}></Route>
                            <Route path='/sklad/send' element={<SendPage></SendPage>}></Route>
                        </Routes>
                </div>
            </div>
        </>
    )
}

export default App;
