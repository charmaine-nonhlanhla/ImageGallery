import { observer } from 'mobx-react-lite';
import { Outlet, useLocation, Navigate, ScrollRestoration } from 'react-router-dom';
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

  if (!commonStore.token && 
      location.pathname !== '/login' && 
      location.pathname !== '/recover' && 
      location.pathname !== '/register' && 
      location.pathname !=='/account/registerSuccess' &&
      location.pathname !== '/logout') {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <ScrollRestoration />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <Outlet />
    </>
  );
}

export default observer(App);
