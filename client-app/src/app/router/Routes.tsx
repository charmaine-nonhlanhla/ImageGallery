import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../pages/LoginForm";
import Register from "../../pages/Register";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'login', element: <LoginForm />},
            {path: 'Register', element: <Register />},
        ]
    },
]

export const router = createBrowserRouter(routes);