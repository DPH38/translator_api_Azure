import express from 'express';
import './config.js'; // Importa a configuração do dotenv
import tradutorRoutes from './src/routes/tradutorRoutes.js';
import { conectarRedis } from './src/models/redisClient.js';
import sequelizeWithDb, { createDatabase } from './src/models/db.js';

const app = express();
app.use(express.json());
app.use('/api', tradutorRoutes);

const PORT = process.env.PORT || 3000;

// Chame a função createDatabase antes de iniciar o servidor
createDatabase().then(() => {
    conectarRedis().then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Acesse o servidor em: http://localhost:${PORT}`);
        });
    });
});