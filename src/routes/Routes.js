import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Paginas
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import Mensajes from '../pages/Mensajes'
import Historial from '../pages/Historial'
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
        <Mensajes user={user} />
      </Route>
      <Route path="/Historial" exact>
        <Historial />
      </Route>
      <Route path="/Settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} />
      </Route>
    </Switch>
  )
}
