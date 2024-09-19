import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import { MainLayout } from '../router/MainLayout';
import Logout from "../../features/Logout/Logout";
import HomePage from "../../features/Home/HomePage";
import NotFound from "../../features/Errors/NotFound";
import LoginForm from "../../features/Login/LoginForm";
import TestErrors from "../../features/Errors/TestError";
import ServerError from "../../features/Errors/ServerError";
import ImageModal from "../../features/ImageModal/ImageModal";
import ProfilePage from "../../features/Profiles/ProfilePage";
import RegisterForm from "../../features/Register/RegisterForm";
import ConfirmEmail from "../../features/Register/ConfirmEmail";
import ResetPassword from "../../features/Password/ResetPassword";
import { PhotoUpload } from "../../features/PhotoUpload/PhotoUpload";
import { PhotoLibrary } from "../../features/MyLibrary/PhotoLibrary";
import RegisterSuccess from "../../features/Register/RegisterSuccess";
import RecoverPassword from "../../features/Password/RecoverPassword";
import PasswordChanged from "../../features/Password/PasswordChanged";
import RecoverPasswordSuccess from "../../features/Password/RecoverPasswordSuccess";
import Comments from "../../features/Comments/Comments";

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
                    { path: 'modal', element: <ImageModal /> }, 
                    { path: 'upload', element: <PhotoUpload /> }, 
                    { path: 'library', element: <PhotoLibrary /> }, 
             
                ]
            },
          
            { path: 'logout', element: <Logout /> }, 
            { path: 'login', element: <LoginForm /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'reset', element: <ResetPassword /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'recover', element: <RecoverPassword /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'profiles/:username', element: <ProfilePage /> },
            { path: 'changepassword', element: <PasswordChanged /> },
            { path: 'account/verifyEmail', element: <ConfirmEmail /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
            { path: 'account/resetPassword', element: <ResetPassword /> },
            { path: 'recover-success', element: <RecoverPasswordSuccess /> },
            { path: 'account/registerSuccess', element: <RegisterSuccess /> },
            { path: 'comment', element: <Comments photoId="" /> }, 
        ]
    },
];

export const router = createBrowserRouter(routes);
