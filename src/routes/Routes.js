import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Paginas
import Home from '../pages/Home'
import Settings from '../pages/Settings'
export default function Routes(props) {
  const { user, setReloadApp } = props

  return (
    <Switch>
      <Route path="/" exact>
        <Home user={user} />
      </Route>
      <Route path="/Calendario" exact>
        <h1>Calendario</h1>
      </Route>
      <Route path="/Mensajes" exact>
        <h1>Mensajes</h1>
      </Route>
      <Route path="/Historial" exact>
        <h1>Historial de citas</h1>
      </Route>
      <Route path="/Settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} />
      </Route>
    </Switch>
  )
}
