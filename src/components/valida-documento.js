//Wendel Cavalcante
import { Component } from 'react';
import { Card } from 'primereact/card';
import { DataService } from '../service/api.service';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { isAuthenticated } from '../service/auth';
import React from 'react';

export default class ValidaDocumento extends Component {
    state = {
        texto: "",
        conviccao: 0,
        classeConvicto: "",
        validacaoVisible: false,
        resultadoValidacao: "",
    };

    constructor(props) {
        super();
        this.toast = React.createRef();
    }

    handleDocumento = async e => {
        e.preventDefault();
        const { texto } = this.state;
        if (!isAuthenticated()) {
            this.toast.current.show({ severity: 'error', summary: 'Não autenticado', detail: "Efetue o login para continuar" });
        } else {
            try {
                let classe = await DataService.validaDocumento(texto);
                let conviccao = classe.resultados[0].conviccao;
                let classeConvicto = classe.classeConvicto.codigo;
                console.log("classe: "+classe);
                this.setState({ conviccao: conviccao, classeConvicto: classeConvicto});
                let r = "";
                if(classeConvicto == "VERDADEIRO")
                    r = "É uma petição inicial";
                else
                    r = "Não é uma petição inicial";
                await this.setState({ validacaoVisible: true, resultadoValidacao: r });
            } catch (err) {
                this.setState({
                    error:
                        ""+err
                });
                console.log(err);
            }
        }
        this.forceUpdate();
    };
    ocultaValidacao = () => {
        this.setState({ validacaoVisible: false });
    };
    render() {
        return (
            <div className="card flex justify-content-center">
                <Toast ref={this.toast} />
                <Dialog header={this.state.resultadoValidacao} visible={this.state.validacaoVisible} style={{ width: '50vw' }} onHide={() => this.ocultaValidacao()}>
                        Convicção:
                        <span>
                            <ProgressBar value={this.state.conviccao}></ProgressBar>
                        </span>
                    
                </Dialog>

                <Card title="Valida Documento">
                    <form className="flex flex-column gap-2" onSubmit={this.handleDocumento}>
                        <span className="p-float-label">
                            <InputTextarea id="documento" onChange={e => this.setState({ texto: e.target.value })}/>
                            <label htmlFor="documento">Documento</label>
                        </span>
                        <span>
                            <button type="submit">Validar</button>
                        </span>
                    </form>
                </Card>
            </div>
        )
    }
}