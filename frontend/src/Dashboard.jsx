import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div>
            <h2> Bem-vindo ao Dashboard!</h2>
            <Navigacion />
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}
export function Configuracao() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div>
            <h2> Bem-vindo as configuracoes!</h2>
            <Navigacion />
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}
export function Perfil() {
    const [pfl, setPerfil] = useState([])
    useEffect(() => {
        const Todo = async () => {
            try {
                var email = localStorage.getItem('email')
                const response = await axios.get(`http://localhost:3000/home/${email}`);
                console.log(response.data[0]);
                setPerfil(response.data[0]);
            } catch (error) {
                console.error(error);
            }

        }
        Todo()
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div>
            <h2> Bem-vindo ao perfil!</h2>
            <h1>nome: {pfl.nome}</h1>
            <h1>nome: {pfl.email}</h1>
            <h1>nome: {pfl.criado_em}</h1>
            <Navigacion />
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}

function Navigacion() {
    const nav = useNavigate();
    return (
        <div>
            <button onClick={() => nav('/dashboard/')} >Dashboard</button>
            <button onClick={() => nav('/dashboard/configuracao')} >Configuração</button>
            <button onClick={() => nav('/dashboard/perfil')} >Perfil</button>
        </div>
    )
}