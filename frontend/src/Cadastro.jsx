import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importando o axios

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirsenha, setConfirSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (senha != confirsenha) {
            setErro("As senhas sao diferentes")
        } else {
            setErro("")
        }
    }, [confirsenha])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resposta = await axios.post('http://localhost:3000/cadastro', {
                nome,
                email,
                senha
            });
            console.log(resposta.data)
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data) {
                setErro(err.response.data.mensagem );
            } else {
                setErro('Erro ao conectar com o servidor');
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '10px' }}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <div>
                    <label> Confirmar Senha:</label>
                    <input type="password" value={confirsenha} onChange={(e) => { setConfirSenha(e.target.value) }} required />
                </div>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit">Entrar</button>
                <Link to={'/login'} >Ja tem conta?? faça login..!!</Link>
            </form>
        </div>
    )
}