import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv';
import { Usuario } from "../models/Usuario";
import { Receita } from "../models/Receita";
dotenv.config()
export const db = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: process.env.USER, 
  password: process.env.PASSWORD, 
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  subscribers: [],
  entities:[
    Usuario,
    Receita
  ]

}) 

