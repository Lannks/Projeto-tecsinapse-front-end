import Axios from 'axios';
import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

export default class LocaisService extends ApiService {

    constructor(){
        super('/api/locais')
    }

    getAll() {
        return this.get('');
    }


    obterPorId(id){
        return this.get(`/${id}`);
    }

    salvar(locais){
        return this.post('', locais);
    }

    atualizar(locais){
        return this.put(`/${locais.id}`, locais);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}