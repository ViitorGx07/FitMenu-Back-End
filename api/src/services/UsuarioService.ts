import { Usuario } from '../models/Usuario';
import { db } from '../config/database';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class UsuarioService {
    private usuarioRepository = db.getRepository(Usuario);

    public async salvarUsuario(nome: string, email: string, senha: string): Promise<Usuario | null> {
        try {
            const usuarioExistente = await this.usuarioRepository.findOne({ where: { email } });

            if (usuarioExistente) {
                return null;
            }

            const hashedPassword = await hash(senha, 10);

            const novoUsuario = this.usuarioRepository.create({
                nome,
                email,
                senha: hashedPassword,
            });

            await this.usuarioRepository.save(novoUsuario);

            return novoUsuario;
        } catch (error) {
            throw new Error('Erro ao salvar o usuário!' + error);
        }
    }

    public async autenticarUsuario(email: string, senha: string): Promise<string | null> {
        try {
            const usuario = await this.usuarioRepository.findOne({ where: { email } });

            if (!usuario) {
                return null;
            }

            const senhaCorreta = await compare(senha, usuario.senha);

            if (!senhaCorreta) {
                return null;
            }

            const token = sign({ userId: usuario.id }, 'jjhggffrrtredddfgghjjkkkjj', { expiresIn: '1h' });

            return token;
        } catch (error) {
            throw new Error('Erro ao autenticar o usuário!' + error);
        }
    }

    public async alterarUsuario(id: number, nome: string, email: string, senha: string): Promise<Usuario | null> {
        try {
            let usuario = await this.usuarioRepository.findOne({ where: { id } });

            if (!usuario) {
                return null;
            }

            usuario.nome = nome;
            usuario.email = email;

            if (senha) {
                usuario.senha = await hash(senha, 10);
            }

            await this.usuarioRepository.save(usuario);

            return usuario;
        } catch (error) {
            throw new Error('Erro ao alterar o usuário!' + error);
        }
    }

    public async deletarUsuario(id: number): Promise<boolean> {
        try {
            const result = await this.usuarioRepository.delete(id);

            return result.affected === 1;
        } catch (error) {
            throw new Error('Erro ao deletar o usuário!' + error);
        }
    }

 
}

export default new UsuarioService();
