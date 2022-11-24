import React, {useState} from 'react';
import {Navigation} from "./components/Navigation";
import {Route, Routes} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {ShowPage} from "./pages/ShowPage";
import {SearchPage} from "./pages/SearchPage";
import {MeltSearchPage} from "./pages/MeltSearchPage";
import {CombinePage} from "./pages/CombinePage";
import {ShipmentPage} from "./pages/ShipmentPage";
import {ShipmentHistoryPage} from "./pages/ShipmentHistoryPage";
import {AdmissionPage} from "./pages/AdmissionPage";
import {SendPage} from "./pages/SendPage";
import "./css/app.css"
import icon from "./assets/icon.svg"
import {Link} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {AxiosError, AxiosResponse} from "axios";
import {Login, ResponseBody} from "./interfaces/models";

function App() {
    const [response, setResponse] = useState<ResponseBody>({type: '', accessToken: '', refreshToken: ''}) //передать в другие хуки
    const [checked, setChecked] = useState(false)

    function doLogin(item: ResponseBody) {
        setResponse(item)
        if (item.accessToken !== '') {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }

    return (
        <>
            <div className='container'>
                {!checked && <Routes>
                    <Route path='/login' element={<LoginPage doLogin={doLogin}/>}/>
                </Routes>}
                {checked && <div>
                    <div className='sidebar'>
                        <img className='image' src={icon} alt="Солнечногорск. Ферротрейд"/>
                        <Navigation/>
                    </div>
                    <div className='mainbar'>
                        <button className='btn-exit'>Выйти</button>
                        <Routes>
                            <Route path='/sklad/register' element={<RegisterPage></RegisterPage>}></Route>
                            <Route path='/sklad/show'
                                   element={<ShowPage type={response?.type} accessToken={response?.accessToken}
                                                      refreshToken={response?.refreshToken}/>}></Route>
                            <Route path='/sklad/search' element={<SearchPage></SearchPage>}></Route>
                            <Route path='/sklad/melt-search' element={<MeltSearchPage></MeltSearchPage>}></Route>
                            <Route path='/sklad/combine' element={<CombinePage></CombinePage>}></Route>
                            <Route path='/sklad/shipment' element={<ShipmentPage></ShipmentPage>}></Route>
                            <Route path='/sklad/shipment-history'
                                   element={<ShipmentHistoryPage></ShipmentHistoryPage>}></Route>
                            <Route path='/sklad/admission' element={<AdmissionPage></AdmissionPage>}></Route>
                            <Route path='/sklad/send' element={<SendPage></SendPage>}></Route>
                        </Routes>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default App;
