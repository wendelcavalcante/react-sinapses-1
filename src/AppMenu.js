//Wendel Cavalcante

import React from 'react';
import { Menubar } from 'primereact/menubar';
import LoginForm from './components/login';
import ValidaDocumento from './components/valida-documento';
import { Routes, Route, Link } from "react-router-dom";

export default function TemplateDemo() {
    const items = [
        {
            label: 'Valida Documento',
            icon: 'pi pi-fw pi-book',
            url: '/react-sinapses/valida-documento'
        },
        {
            label: 'Login',
            icon: 'pi pi-fw pi-power-off',
            url: '/react-sinapses/login'
        },
    ];

    const start = "Curso Sinapses - Tarefa 3";

    return (
        <div className="card">
            <Menubar model={items} start={start}/> 
            <Routes>
                <Route path='/react-sinapses/valida-documento' Component={ValidaDocumento} />
                <Route path='/react-sinapses/login' Component={LoginForm} />
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Routes>
        </div>
    )
}
