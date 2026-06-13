import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

    return (
        <div>
            <h2> Bem-vindo ao Dashboard!</h2>
            <Navigacion />

        </div>
    );
}
export function Configuracao() {
    const [senha, setSenha] = useState('');
    const [confirsenha, setConfirSenha] = useState('');
    const [erro, setErro] = useState('');

    const alterarSenha = async () => {
        const response  = await axios.put('http://localhost:3000/alterarSenha', {
            email: localStorage.getItem('email'),
            senha: senha
        })
        console.log(response.data);
        
    }

    useEffect(() => {
        if (senha != confirsenha) {
            setErro("As senhas sao diferentes")
        } else {
            setErro("")
        }
    }, [confirsenha])

    return (
        <div>
            <h2> Bem-vindo as configuracoes!</h2>
            <div style={{ display:"flex", gap:10, flexDirection:"column", width:200 }} >
                <input type="text" placeholder="Digite a nova senha" onChange={(e) => setSenha(e.target.value)} />
                <input type="text" placeholder="Confirme a nova senha" onChange={(e) => setConfirSenha(e.target.value)} />
                <button type="button" onClick={() => alterarSenha()} >Confirmar senha</button>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
            </div>
            <Navigacion />
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

    return (
        <div>
            <h2> Bem-vindo ao perfil!</h2>
            <h1>nome: {pfl.nome}</h1>
            <h1>nome: {pfl.email}</h1>
            <h1>nome: {pfl.criado_em}</h1>
            <Navigacion />
        </div>
    );
}

function Navigacion() {
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 100, justifyItems: "center" }} >
            <button onClick={handleLogout}>Sair</button>
            <button onClick={() => nav('/dashboard/')} >Dashboard</button>
            <button onClick={() => nav('/dashboard/configuracao')} >Configuração</button>
            <button onClick={() => nav('/dashboard/perfil')} >Perfil</button>
        </div>
    )
}