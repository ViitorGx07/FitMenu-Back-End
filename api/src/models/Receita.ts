import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';

interface IReceita {
    nome:string;
    imagem:string;
    descricao:string;
    ingredientes:string;
    modoDePreparo:string;
}

@Entity('Receita')
export class Receita implements IReceita {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    imagem: string;

    @Column()
    descricao: string;

    @Column()
    ingredientes: string;

    @Column()
    modoDePreparo: string;

    @ManyToOne(() => Usuario, usuario => usuario.receitas,{onDelete:"CASCADE"})
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

}
