import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}><RouterProvider router={router}/></Provider>
);
