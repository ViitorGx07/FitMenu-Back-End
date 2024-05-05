import express, { Request, Response } from 'express';
import ReceitaService from '../services/ReceitaService';
import { authMiddleware } from '../middlewares/authMiddleware';

const receitaRouter = express.Router();

receitaRouter.post('/salvar-Receita',authMiddleware, async (req: Request, res: Response) => {
    try {
        const { nome, imagem, descricao, ingredientes, modoDePreparo } = req.body;

        const receita = await ReceitaService.salvarReceita(nome, imagem, descricao, ingredientes, modoDePreparo);
        if (receita) {
            if (req.body.userId) {
                receita.usuario = req.body.userId;
            }
            
            res.status(201).json(receita);
        } else { 
            res.status(400).json({ message: 'Erro ao salvar a receita.' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

receitaRouter.get('/pesquisa/:nome', async (req: Request, res: Response) => {
    try {
        const nome = req.params.nome;

        if (nome) {
            const receitas = await ReceitaService.pesquisa(nome);
            res.json(receitas);
        } else {
            const receitas = await ReceitaService.buscarReceitas();
            res.json(receitas);
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});


receitaRouter.get('/receitas/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const receita = await ReceitaService.buscarReceitaPorId(id);
        if (receita) {
            res.json(receita);
        } else {
            res.status(404).json({ message: 'Receita não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

receitaRouter.put('/alterar-receita/:id',authMiddleware, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, imagem, descricao, ingredientes, modoDePreparo } = req.body;
        const receita = await ReceitaService.alterarReceita(id, nome, imagem, descricao, ingredientes, modoDePreparo);
        if (receita) {
            res.json(receita);
        } else {
            res.status(404).json({ message: 'Receita não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

receitaRouter.delete('/deletar/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await ReceitaService.deletarReceita(id);
        if (result) {
            res.status(204).json({ message: 'Receita deletada com sucesso.' });
        } else {
            res.status(404).json({ message: 'Receita não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ message: error});
    }
});

export default receitaRouter;
