import { observer } from 'mobx-react-lite';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />;

  // Redirect to login if not authenticated and trying to access protected routes
  if (!commonStore.token && location.pathname !== '/login') {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <Outlet />
    </>
  );
}

export default observer(App);
