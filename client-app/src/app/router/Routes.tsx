import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/Login/LoginForm";
import TestErrors from "../../features/Errors/TestError";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";
import RegisterForm from "../../features/Register/RegisterForm"
import ProfilePage from "../../features/profiles/ProfilePage";
import { MainLayout } from "./MainLayout";
import { PhotoUpload } from "../../features/PhotoUpload/PhotoUpload";

export const routes: RouteObject[] = [
    {
        
        element: <MainLayout />,
        children: [
            {path: 'home', element: <HomePage />},
            {path: 'upload', element: <PhotoUpload />},
            ]
    },

    {
        path: '/',
        element: <LoginForm />,
        children: [
            {path: 'login', element: <LoginForm />},
            {path: 'Register', element: <RegisterForm />},
            {path: 'profiles/:username', element: <ProfilePage />},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
            ]
    },
];



export const router = createBrowserRouter(routes);