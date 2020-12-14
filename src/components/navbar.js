import React from 'react'

import NavbarItem from './navbarItem'

function Navbar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand">Desafio TecSinapse</a>  
          <div>
            <ul className="navbar-nav">
                <NavbarItem render={true} href="#/home" label="Sair" />
                <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair" />
            </ul>
            </div>
        </div>
      </div>
    )
}

export default Navbar