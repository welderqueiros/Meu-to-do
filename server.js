import express from 'express';
import { PrismaClient } from '@prisma/client';
//import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//criar usuario
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    });
    res.status(201).json({
        mensagem: 'Usuario criado com sucesso!',
        user: req.body
    });
});

//listar usuarios
app.get('/usuarios', async (req, res) => {
    let usuarios = [];

    if (req.query.name) {
        usuarios = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email
            }
        });
        res.status(200).json({
            message: "Usuário encontrado!",
            usuario: usuarios
        });
    } else {
        usuarios = await prisma.user.findMany({});
        res.status(200).json({
            message: "Lista de usuário",
            usuario: usuarios
        });
    }
});

//editar usuario
app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    });
    res.status(200).json({
        mensagem: 'Usuario editado com sucesso!',
        user: req.body
    });
});

//deletar usuario
app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({
        mensagem: 'Usuario deletado com sucesso!',
        user: req.body
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});

