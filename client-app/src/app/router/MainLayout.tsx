import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from "../../features/Header/Header";
import { Taskbar } from "../../features/Taskbar/Taskbar";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
        <Taskbar/>
        <Header />
        {children || <Outlet />}
    </div>
  );
};
