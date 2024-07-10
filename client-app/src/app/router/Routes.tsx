import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ImageDetails from "../../features/images/details/ImageDetails";
import Login from "../../pages/Login";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'images', element: <ImageDetails/>},
            {path: 'Login', element: <Login/>},
            
        ]
    }
]

export const router = createBrowserRouter(routes);