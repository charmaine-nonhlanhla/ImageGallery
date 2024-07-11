import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/users/LoginForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            // {path: 'Login', element: <Login />},
            {path: 'login', element: <LoginForm />},
            // {path: 'Register', element: <Register />},
        ]
    },
]

export const router = createBrowserRouter(routes);