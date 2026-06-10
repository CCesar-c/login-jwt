import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors'; // 1. Importa o CORS
import { pool } from './connection.js';

const app = express();

app.use(cors()); // 2. Habilita o CORS para permitir requisições do React
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const JWT_SECRET = 'sua_chave_secreta_aqui';

// Usuário simulado (Senha: '123456')

// const usuarioFake = {
//   email: 'admin@email.com',
//   senhaHash: '$2b$10$13T4x1mVb0ifV4p3AsfXpeJ5Lb9C2IFIqFHd3.lXI2Y50WEhsp53i' 
// };

app.get('/home/:email', async (request, response) => {
    const { email } = request.params
    const user_db = await pool.query("select * from usuarios where email = $1", [email]);
    console.log(user_db.rows)
    response.json(user_db.rows);
});



app.post('/cadastro', async (req, response) => {
    const { nome, email, senha } = req.body;
    try {
        const user_db = await pool.query("select * from usuarios where email = $1", [email]);
        console.log(user_db.rows[0] == undefined);

        if (user_db.rows[0] == undefined) {
            const hashGerado = await bcrypt.hash(senha, 10);
            const user_db_post = await pool.query("insert into usuarios values(Default, $1, $2, $3) returning *", [nome, email, hashGerado]);
            console.log(`Resposta do DB e ${user_db_post.rows} `);
            return response.send(user_db_post.rows)
        } else if (user_db.rows[0].email == email) {
            return response.status(401).json({ mensagem: 'Credenciais inválidas usuario ja existe' });
        }
    } catch (error) {
        console.error("Erro na linha 42:" + error);
        response.status(500).send("Erro al enviar os arquivos");
    }

})

app.post('/login', async (request, response) => {
    const { email, senha } = request.body;
    var user_db;
    try {
        user_db = await pool.query("select * from usuarios where email = $1", [email]);
    } catch (error) {
        console.error("Erro na linha 55:" + error)
        res.status(401).send("Erro al receber os arquivos");
    }

    if (email !== user_db.rows[0].email) {
        return response.status(401).json({ mensagem: ' Credenciais inválidas com o email' });
    }

    // Compara a senha digitada com ela mesma criptografada na hora (apenas para testar se passa!)
    const senhaValida = await bcrypt.compare(senha, user_db.rows[0].senha_hash);
    // console.log( "senha hash:\n" + user_db.rows[0].senha_hash);

    if (!senhaValida) {
        // 
        // para parar o codigo
        // 
        // ||
        // ||
        // \/
        return response.status(401).json({ mensagem: ' Credenciais inválidas senha invalida' });
    }

    const token = jwt.sign({ email: user_db.rows[0].email }, JWT_SECRET, { expiresIn: '1h' });
    // console.log( "token:\n" +token)
    response.json(token);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));