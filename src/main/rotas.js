import React from 'react'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'

import { Route, Switch, HashRouter, Rerect } from 'react-router-dom'
import lista from '../views/lista'

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={CadastroUsuario} />
                <Route path="/lista" component={lista} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas