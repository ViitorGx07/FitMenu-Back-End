import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Receita } from './Receita';

interface IUsuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

@Entity('Usuario')
export class Usuario implements IUsuario {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @OneToMany(() => Receita, receita => receita.usuario,{cascade:true})
    receitas: Receita[];

}
