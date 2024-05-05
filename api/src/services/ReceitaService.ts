import { Receita } from '../models/Receita';
import { db } from '../config/database';
import { ILike } from 'typeorm';

class ReceitaService {
    private receitaRepository = db.getRepository(Receita);

    public async salvarReceita(nome: string, imagem: string, descricao: string, ingredientes: string, modoDePreparo: string): Promise<Receita | null> {
        try {
            const novaReceita = this.receitaRepository.create({
                nome, 
                imagem,
                descricao,
                ingredientes,
                modoDePreparo,
            });

            await this.receitaRepository.save(novaReceita);

            return novaReceita;
        } catch (error) {
            throw new Error('Erro ao salvar a receita!' + error);
        }
    }

    public async buscarReceitas(): Promise<Receita[]> {
        try {
            const receitas = await this.receitaRepository.find();

            return receitas;
        } catch (error) {
            throw new Error('Erro ao buscar as receitas!' + error);
        }
    }

    public async buscarReceitaPorId(id: number): Promise<Receita | null> {
        try {
            const receita = await this.receitaRepository.findOne({where:{id}});

            return receita || null;
        } catch (error) {
            throw new Error('Erro ao buscar a receita!' + error);
        }
    }

    public async alterarReceita(id: number, nome: string, imagem: string, descricao: string, ingredientes: string, modoDePreparo: string): Promise<Receita | null> {
        try {
            let receita = await this.receitaRepository.findOne({ where: { id } });

            if (!receita) {
                return null;
            }

            receita.nome = nome;
            receita.imagem = imagem;
            receita.descricao = descricao;
            receita.ingredientes = ingredientes;
            receita.modoDePreparo = modoDePreparo;

            await this.receitaRepository.save(receita);

            return receita;
        } catch (error) {
            throw new Error('Erro ao alterar a receita!' + error);
        }
    }

    public async deletarReceita(id: number): Promise<boolean> {
        try {
            const result = await this.receitaRepository.delete(id);

            return result.affected === 1;
        } catch (error) {
            throw new Error('Erro ao deletar a receita!' + error);
        }
    }
    public async pesquisa(pesquisa: string): Promise<Receita[]> {
        try {
            const receitas = await this.receitaRepository.find({
                where: [
                    { nome: ILike(`%${pesquisa}%`) },
                    { ingredientes: ILike(`%${pesquisa}%`) }
                ]
            });

            return receitas;
        } catch (error) {
            throw new Error('Erro ao buscar as receitas!' + error);
        }
    }

}

export default new ReceitaService();
