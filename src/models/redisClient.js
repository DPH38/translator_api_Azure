import { createClient } from "redis";

const cliente = createClient({
    password: process.env.REDIS_SENHA,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORTA
    }
});


const conectarRedis = async () => {
    try {
        await cliente.connect();
        console.log('Conectado ao Redis');
    } catch (error) {
        console.error('Erro ao conectar ao Redis:', error);
    }
}

export {cliente, conectarRedis};