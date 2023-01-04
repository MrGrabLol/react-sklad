import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/app.css'
import {LoginPage} from "./pages/LoginPage";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import {SkladPage} from "./pages/SkladPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ShowPage} from "./pages/ShowPage";
import {SearchPage} from "./pages/SearchPage";
import {MeltSearchPage} from "./pages/MeltSearchPage";
import {CombinePage} from "./pages/CombinePage";
import {ShipmentPage} from "./pages/ShipmentPage";
import {ShipmentHistoryPage} from "./pages/ShipmentHistoryPage";
import {AdmissionPage} from "./pages/AdmissionPage";
import {SendPage} from "./pages/SendPage";
import {PositionPage} from "./pages/PositionPage";
import {loader as cardIdLoader, PositionDetails} from "./components/PositionDetails";
import {PositionPrint} from "./components/PositionPrint";

const JSXRoutes = (
    <>
        <Route path='/' element={<Navigate to='/sklad'/>}/>
        <Route path='/sklad' element={<SkladPage></SkladPage>} children={
            <>
                <Route path='/sklad/register' element={<RegisterPage></RegisterPage>}/>
                <Route path='/sklad/show' element={<ShowPage />}/>
                <Route path='/sklad/search' element={<SearchPage/>}/>
                <Route path='/sklad/melt-search' element={<MeltSearchPage/>}/>
                <Route path='/sklad/combine' element={<CombinePage></CombinePage>}/>
                <Route path='/sklad/shipment' element={<ShipmentPage></ShipmentPage>}/>
                <Route path='/sklad/shipment-history' element={<ShipmentHistoryPage></ShipmentHistoryPage>}/>
                <Route path='/sklad/admission' element={<AdmissionPage></AdmissionPage>}/>
                <Route path='/sklad/send' element={<SendPage></SendPage>}/>
            </>
        }/>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='/position/:id' element={<PositionPage/>} children={
            <>
                <Route path='/position/:id' loader={cardIdLoader} element={<PositionDetails/>}/>
                <Route path='/position/:id/print' element={<PositionPrint/>}/>
            </>
        }/>

    </>
)

const routes = createRoutesFromElements(JSXRoutes);
const router = createBrowserRouter(routes);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <RouterProvider
        router={router}
    />
);

