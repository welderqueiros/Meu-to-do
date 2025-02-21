import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//criar usuario

app.post('/usuarios', (req, res) => {
    usuarios.push(req.body);
    res.status(201).json({
        mensagem: 'Usuario criado com sucesso!',
        usuario: req.body
    });
});

app.get('/usuarios', (req, res) => {
    res.status(200).json({
        mensagem: 'Lista de usuários',
        usuarios: usuarios
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});

