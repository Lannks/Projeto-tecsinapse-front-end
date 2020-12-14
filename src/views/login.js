import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'
import { mensagemErro } from '../components/toastr'
import { AuthContext  } from '../main/provedorAutenticacao'

class Login extends React.Component {
 
    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {      
            localStorage.setItem('user', this.state.email);
            this.props.history.push('/lista')
        }).catch( erro => {
         mensagemErro(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro')
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-6" style={{ position: 'fixed', left: '25%' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={this.entrar} className="btn btn-primary">
                                                <i className="pi"></i>Entrar</button>
                                            <button onClick={this.prepareCadastrar}
                                                className="btn btn-success">
                                                <i className="pi "></i>Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}

Login.contextType = AuthContext

export default withRouter(Login)