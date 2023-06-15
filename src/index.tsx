import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/app.css'
import {LoginPage} from "./pages/LoginPage";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {SkladPage} from "./pages/SkladPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ShowPage} from "./pages/ShowPage";
import {ScanPage} from "./pages/ScanPage";
import {SearchPage} from "./pages/SearchPage";
import {CombinePage} from "./pages/CombinePage";
import {DispatchPage} from "./pages/DispatchPage";
import {DispatchHistoryPage} from "./pages/DispatchHistoryPage";
import {AdmissionPage} from "./pages/AdmissionPage";
import {SendPage} from "./pages/SendPage";
import {PositionPage} from "./pages/PositionPage";
import {loader as cardIdLoader, PositionDetails} from "./components/PositionDetails";
import {PositionPrint} from "./components/PositionPrint";
import {PositionShipping} from "./components/PositionShipping";
import {MeltSearchWeights, weightLoader} from "./components/MeltSearchWeights";
import {ReservePage} from "./pages/ReservePage";
import {ReserveDetailsPage, reserveIdLoader} from "./pages/ReserveDetailsPage";
import {ReserveConfirm} from "./components/ReserveConfirm";
import {ReserveDispatch} from "./components/ReserveDispatch";
import {ReserveDetails} from "./components/ReserveDetails";
import {WelcomePage} from "./pages/WelcomePage";
import {SendHistoryPage} from "./pages/SendHistoryPage";
import {SendDetails, transferLoader} from "./components/SendDetails";
import {PricesPage} from "./pages/PricesPage";

const JSXRoutes = (
    <>
        <Route path='/' element={<SkladPage/>} children={
            <>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/show' element={<ShowPage/>}/>
                <Route path='/search' element={<ScanPage/>}/>
                <Route path='/melt-search' element={<SearchPage/>}/>
                <Route path='/weights/:mark/:diameter/:packing/:plav/:part' loader={weightLoader} element={<MeltSearchWeights/>}/>
                <Route path='/combine' element={<CombinePage/>}/>
                <Route path='/dispatch' element={<DispatchPage/>}/>
                <Route path='/dispatch-history' element={<DispatchHistoryPage/>}/>
                <Route path='/admission' element={<AdmissionPage/>}/>
                <Route path='/send' element={<SendPage/>}/>
                <Route path='/send-details/:id' element={<SendDetails/>} loader={transferLoader}/>
                <Route path='/send-history' element={<SendHistoryPage/>}/>
                <Route path='/reserve' element={<ReservePage/>}/>
                <Route path='/prices' element={<PricesPage/>}/>
            </>
        }/>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='/position/:id' element={<PositionPage/>} children={
            <>
                <Route path='/position/:id/info' loader={cardIdLoader} element={<PositionDetails/>}/>
                <Route path='/position/:id/print' loader={cardIdLoader} element={<PositionPrint/>}/>
                <Route path='/position/:id/dispatch' loader={cardIdLoader} element={<PositionShipping/>}/>
            </>
        }/>

        <Route path='/reserve/:id' loader={reserveIdLoader} element={<ReserveDetailsPage/>} children={
            <>
                <Route path='/reserve/:id/info' loader={reserveIdLoader} element={<ReserveDetails/>}/>
                <Route path='/reserve/:id/confirm' loader={reserveIdLoader} element={<ReserveConfirm/>}/>
                <Route path='/reserve/:id/dispatch' loader={reserveIdLoader} element={<ReserveDispatch/>}/>
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

