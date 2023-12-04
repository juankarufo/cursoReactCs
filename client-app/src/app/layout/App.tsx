
import { Fragment } from 'react'
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation();
  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            <Outlet />
          </Container>
        </>
      ) }
    </Fragment>
  )
}

export default observer(App)
