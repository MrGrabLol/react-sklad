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
import {PositionShipping} from "./components/PositionShipping";
import {MeltSearchWeights, weightLoader} from "./components/MeltSearchWeights";

const JSXRoutes = (
    <>
        <Route path='/' element={<SkladPage></SkladPage>} children={
            <>
                <Route path='/register' element={<RegisterPage></RegisterPage>}/>
                <Route path='/show' element={<ShowPage/>}/>
                <Route path='/search' element={<SearchPage/>}/>
                <Route path='/melt-search' element={<MeltSearchPage/>}/>
                <Route path='/weights/:mark/:diameter/:packing/:plav/:part' loader={weightLoader} element={<MeltSearchWeights/>}/>
                <Route path='/combine' element={<CombinePage></CombinePage>}/>
                <Route path='/shipment' element={<ShipmentPage></ShipmentPage>}/>
                <Route path='/shipment-history' element={<ShipmentHistoryPage></ShipmentHistoryPage>}/>
                <Route path='/admission' element={<AdmissionPage></AdmissionPage>}/>
                <Route path='/send' element={<SendPage></SendPage>}/>
            </>
        }/>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='/position/:id' element={<PositionPage/>} children={
            <>
                <Route path='/position/:id' loader={cardIdLoader} element={<PositionDetails/>}/>
                <Route path='/position/:id/print' loader={cardIdLoader} element={<PositionPrint/>}/>
                <Route path='/position/:id/dispatch' loader={cardIdLoader} element={<PositionShipping/>}/>
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

