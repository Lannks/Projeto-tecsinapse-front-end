import React from 'react'

class Home extends React.Component {


    render() {
        return (
            <div className="jumbotron" style={{ marginTop: '5%' }}>
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é um sistema para você achar sua partida de tênis ideal no lugar certo.</p>
                <p className="lead">Para acessar o setor administrativo:</p>
                <p className="lead">nome: admin</p>
                <p className="lead">senha: admin</p>
                <hr className="my-4" />
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="#/login"
                        role="button"><i className="pi"></i>
                     Login
                    </a>
                </p>
            </div>
        )
    }
}


export default Home