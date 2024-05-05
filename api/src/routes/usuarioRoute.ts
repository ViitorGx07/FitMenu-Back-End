import { Router } from 'express';
import UsuarioService from '../services/UsuarioService';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/cadastrar', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const novoUsuario = await UsuarioService.salvarUsuario(nome, email, senha);
        if (!novoUsuario) {
            return res.status(400).json({ message: 'O usuário já existe' });
        }
        console.log(req.body.userId)
        res.json(novoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
});

router.post('/usuarios/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const token = await UsuarioService.autenticarUsuario(email, senha);
        if (!token) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
});

router.put('/alterar-usuario/', authMiddleware, async (req, res) => {
    
    const { nome, email, senha } = req.body;
    try {
        const usuarioAtualizado = await UsuarioService.alterarUsuario(req.body.userId, nome, email, senha);
        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: error });
    }
});

router.delete('/deletar-usuario', authMiddleware, async (req, res) => {
    try {
        const deletado = await UsuarioService.deletarUsuario(req.body.userId);
        if (!deletado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(204).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
});


export default router;
