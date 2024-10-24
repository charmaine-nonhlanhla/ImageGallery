import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../features/Header/Header";
import { Taskbar } from "../../features/Taskbar/Taskbar";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [activeElement, setActiveElement] = useState<
    "home" | "image-upload" | "my-library" | "logout" | ""
  >("");

  return (
    <div>
      <Taskbar
        setActiveElement={setActiveElement}
        activeElement={activeElement}
      />
      <Header activeElement={activeElement} />
      {children || <Outlet />}
    </div>
  );
};
