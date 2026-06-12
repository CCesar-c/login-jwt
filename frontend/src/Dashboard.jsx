import axios from "axios";
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
    useEffect(() => {
        const Todo = async () => {
            try {
                var email = localStorage.getItem('email')
                const response = await axios.get(`http://localhost:3000/home/${email}`);
                console.log(response);
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
            <h1>nome: { }</h1>
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
            <button onClick={() => nav('/dashboard/configuracao')} >Dashboard</button>
            <button onClick={() => nav('/dashboard/perfil')} >Dashboard</button>
        </div>
    )
}