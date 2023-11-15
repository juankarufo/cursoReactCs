
import { Fragment, useEffect } from 'react'
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router';

function App() {
  return (
    <Fragment>

      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Outlet />
      </Container>
      
    </Fragment>
  )
}

export default observer(App)
