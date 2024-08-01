import { Outlet } from "react-router-dom"
import { Header } from "../../features/Header/Header"
import { Taskbar } from "../../features/Taskbar/Taskbar"
import HomePage from "../../features/home/HomePage"

export const MainLayout = () => {
  return (
    <div>
        <Taskbar/>
        <Header />
        <Outlet />
    </div>
  )
}
