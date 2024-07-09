import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ImageDetails from "../../features/images/details/ImageDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'images', element: <ImageDetails/>},
        ]
    }
]

export const router = createBrowserRouter(routes);