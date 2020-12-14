import Axios from 'axios';
import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService {

    constructor(){
        super('/api/jogador')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    salvar(usuario){
        return this.post('/', usuario);
    }

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.')
        }

        if(!usuario.email){
            erros.push('O campo Email é obrigatório.')
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x.')
        }else if( usuario.senha !== usuario.senhaRepeticao ){
            erros.push('As senhas não batem.')
        }        

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }


}

export default UsuarioService;