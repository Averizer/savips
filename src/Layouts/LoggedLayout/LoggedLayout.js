import React from 'react'
import { Grid } from 'semantic-ui-react'
import { BrowserRouter as BR } from 'react-router-dom'
import './LoggedLayout.scss'

//Componentes
import TopBar from '../../components/TopBar'
import Routes from '../../routes/Routes'
import MenuLeft from '../../components/MenuLeft'
import Notificaciones from '../../components/Notificaciones'
export default function LoggedLayout(props) {
  const { user, setReloadApp } = props
  return (
    <BR>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={9}>
            <TopBar user={user} />
            <Routes user={user} setReloadApp={setReloadApp} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Notificaciones user={user} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BR>
  )
}
