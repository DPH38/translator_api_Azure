import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Tradutor from './tradutor.js'; // Import the Tradutor model

dotenv.config();

const sequelize = new Sequelize('', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

async function createDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o MariaDB estabelecida com sucesso!');
        const [results] = await sequelize.query('SHOW DATABASES');
        const dbExists = results.some(result => result.Database === process.env.DB_NAME);
        if (!dbExists) {
            console.log('Banco de dados não existe, vamos criar.');
            await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log('Banco de dados criado com sucesso.');
        } else {
            console.log('Banco de dados já existe.');
        }
    } catch (error) {
        console.error('Erro ao conectar ou executar consulta:', error);
    } finally {
        await sequelize.close();
    }
}

const sequelizeWithDb = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

async function syncDatabase() {
    try {
        await sequelizeWithDb.authenticate();
        console.log('Conexão com o MariaDB estabelecida com sucesso!');
        await Tradutor.sync({ alter: true }); // Cria a tabela se não existir
        console.log('Tabela sincronizada com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar tabela:', error);
    }
}

syncDatabase();

export default sequelizeWithDb;
export { createDatabase };