import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';


import React, { Component } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../custom.css';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService';
import LocaisService from '../app/service/locaisService';
import Axios from 'axios';
import { mensagemErro, mensagemSucesso } from '../components/toastr';

export class Lista extends Component {

    constructor(props) {
        super(props);
        this.state = {
            local: {
                id: '',
                nome: '',
                cidade: '',
                bairro: ''
            },
            locais: null,
            deleteProductDialog: false,
            user: ''
        };

        this.service = new LocaisService();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.get = this.get.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveProduct = this.saveProduct.bind(this);

    }

    componentDidMount() {
        this.get();
    }


    get() {
        Axios.get(`http://localhost:8080/api/locais`)
            .then(res => {
                const locais = res.data;
                this.setState({ locais });
            })
        let user = localStorage.getItem('user');
        this.setState({ user });
    }

    openNew() {
        this.setState({
            local: this.state.local,
            submitted: false,
            productDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }

    saveProduct() {
        if (!this.state.local.nome) {
            mensagemErro("O nome é um campo Obrigatório!")
        } else {
            this.service.salvar(this.state.local)
            this.get()
        }
    }

    deletar(rowData) {
        Axios.delete('http://localhost:8080/api/locais/' + rowData.id)
    }


    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let local = { ...this.state.local };
        local[`${name}`] = val;

        this.setState({ local });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Adicionar Local " icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
            </React.Fragment>
        )
    }

    actionBodyTemplate(rowData) {
        return (
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => { Axios.delete('http://localhost:8080/api/locais/' + rowData.id); window.location.reload(true); mensagemSucesso('deletado com sucesso!'); }} />
        );
    }

    sucess() {
        return (
            <React.Fragment>
                <Button icon="pi pi-check-square" className="p-button-rounded p-button-success" onClick={() => mensagemSucesso('Inscrito com sucesso!')} />
            </React.Fragment>
        );
    }

    render() {
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct} />
            </React.Fragment>
        );
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo" style={{ marginTop: '3%' }}>
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    {this.state.user === "admin" &&
                        <Toolbar className="p-mb-4" left={this.leftToolbarTemplate}></Toolbar>}

                    <DataTable ref={(el) => this.dt = el} value={this.state.locais} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}    >

                        <Column field="nome" header="Nome" filter></Column>
                        <Column field="cidade" header="Cidade" filter></Column>
                        <Column field="bairro" header="Bairro" filter></Column>
                        {this.state.user === "admin" &&
                            <Column header="ações" body={this.actionBodyTemplate}></Column>}
                        {this.state.user !== "admin" &&
                            <Column header="inscrever-se" body={this.sucess}></Column>}

                    </DataTable>
                </div>

                <Dialog visible={this.state.productDialog} style={{ width: '450px' }} header="Cadastrar Local" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Nome</label>
                        <InputText id="name" value={this.state.local.nome} onChange={(e) => this.onInputChange(e, 'nome')} required autoFocus />
                    </div>
                    <div className="p-field">
                        <label htmlFor="cidade">Cidade</label>
                        <InputText id="cidade" value={this.state.local.cidade} onChange={(e) => this.onInputChange(e, 'cidade')} required autoFocus />
                    </div>
                    <div className="p-field">
                        <label htmlFor="bairro">Bairro</label>
                        <InputText id="bairro" value={this.state.local.bairro} onChange={(e) => this.onInputChange(e, 'bairro')} required autoFocus />
                    </div>

                </Dialog>

                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.product && <span>Você deseja deletar o local?<b>{this.state.product.name}</b>?</span>}
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default withRouter(Lista)