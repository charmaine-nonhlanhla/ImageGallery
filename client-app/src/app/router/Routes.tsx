import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/Login/LoginForm";
import TestErrors from "../../features/Errors/TestError";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";
import RegisterForm from "../../features/Register/RegisterForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import { MainLayout } from '../router/MainLayout';
import { PhotoUpload } from "../../features/PhotoUpload/PhotoUpload";
import { PhotosLibrary } from "../../features/MyLibrary/PhotosLibrary";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
          
            {
                path: '',
                element: <MainLayout />, 
                children: [
                    { path: '', element: <HomePage /> }, 
                    { path: 'upload', element: <PhotoUpload /> }, 
                    { path: 'library', element: <PhotosLibrary /> }, 

                ]
            },
          
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'profiles/:username', element: <ProfilePage /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    },
];

export const router = createBrowserRouter(routes);
