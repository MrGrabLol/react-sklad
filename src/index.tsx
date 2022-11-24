import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {ResponseBody} from "./interfaces/models";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const [response, setResponse] = useState<ResponseBody>({type: '', accessToken: '', refreshToken: ''}) //передать в другие хуки
// const [checked, setChecked] = useState(false)
//
// function doLogin(item: ResponseBody) {
//     setResponse(item)
//     if (item.accessToken !== '') {
//         setChecked(true)
//     } else {
//         setChecked(false)
//     }
// }

root.render(
    <BrowserRouter>
        {/*<LoginPage doLogin={doLogin}/>*/}
        <App />
    </BrowserRouter>
);

