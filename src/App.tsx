import React from 'react';
import {LoginPage} from "./pages/LoginPage";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {ShowPage} from "./pages/ShowPage";
import {SearchPage} from "./pages/SearchPage";
import {MeltSearchPage} from "./pages/MeltSearchPage";
import {CombinePage} from "./pages/CombinePage";
import {ShipmentPage} from "./pages/ShipmentPage";
import {ShipmentHistoryPage} from "./pages/ShipmentHistoryPage";
import {AdmissionPage} from "./pages/AdmissionPage";
import {SendPage} from "./pages/SendPage";
import './css/app.css'
import useToken from "./hooks/useToken";
import {CardIdView} from "./pages/CardIdView";
import {loader as cardIdLoader} from './components/CardIdViewShow'
import {SkladPage} from "./pages/SkladPage";
import {CardIdViewShow} from "./components/CardIdViewShow";
import {CardIdViewPrint} from "./components/CardIdViewPrint";

function App() {
    const {token, setToken} = useToken()

    if (!token) {
        return <LoginPage setToken={setToken}/>
    }

    const JSXRoutes = (
        <>
            <Route path='/sklad' element={<SkladPage></SkladPage>} children={
                <>
                    <Route path='/sklad/register' element={<RegisterPage></RegisterPage>}/>
                    <Route path='/sklad/show' element={<ShowPage token={token}/>}/>
                    <Route path='/sklad/search' element={<SearchPage token={token}/>}/>
                    <Route path='/sklad/melt-search' element={<MeltSearchPage token={token}/>}/>
                    <Route path='/sklad/combine' element={<CombinePage></CombinePage>}/>
                    <Route path='/sklad/shipment' element={<ShipmentPage></ShipmentPage>}/>
                    <Route path='/sklad/shipment-history' element={<ShipmentHistoryPage></ShipmentHistoryPage>}/>
                    <Route path='/sklad/admission' element={<AdmissionPage></AdmissionPage>}/>
                    <Route path='/sklad/send' element={<SendPage></SendPage>}/>
                </>
            }/>
            <Route path='/login' element={<LoginPage setToken={setToken}/>}/>
            {/*<Route path='/position/:id' element={<CardIdView/>} loader={cardIdLoader}/>*/}

            <Route path='/position/:id' element={<CardIdView/>} children={
                <>
                    <Route path='/position/:id/show' loader={cardIdLoader} element={<CardIdViewShow/>}/>
                    <Route path='/position/:id/print' element={<CardIdViewPrint/>}/>
                </>
            }/>

        </>
    )

    const routes = createRoutesFromElements(JSXRoutes);
    const router = createBrowserRouter(routes);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App;
