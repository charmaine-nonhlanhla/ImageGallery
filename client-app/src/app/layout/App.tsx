import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css';



function App() {
  const location = useLocation();
  
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
    {location.pathname === '/' ? <HomePage /> : (
      <>
      <Outlet />
     </>
    )}
    </>
  );
}

export default observer(App);
