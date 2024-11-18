import express from 'express';
import { translateText } from '../controllers/tradutorController.js';
import { cliente } from '../models/redisClient.js';
import Tradutor from '../models/tradutor.js';

const router = express.Router();

router.post('/traduzir', async (req, res) => {

    const { text: text, fromLang: idiomaOrigem, toLang: idiomaDestino } = req.body;

    const redisKey = `${idiomaOrigem}:${idiomaDestino}:${text}`;

    try { // Verificar se a tradução está no Redis
        const cachedtraducao = await cliente.get(redisKey);
        if (cachedtraducao) { // Tradução encontrada no Redis
            try {
                storeMariadb({
                    texto_original: text,
                    texto_traduzido: JSON.parse(cachedtraducao)[0]['translations'][0].text,
                    idioma_origem: idiomaOrigem,
                    idioma_destino: idiomaDestino,
                    source: 'Redis'
                });
            } catch (error) {
                console.error('Erro ao salvar tradução no banco de dados:', error);
            }
            return res.json({ resource: 'redis', data: JSON.parse(cachedtraducao) });
        }
    } catch (error) {
        console.error('Erro ao buscar tradução no Redis:', error);
        res.status(500).send('Erro ao buscar tradução no Redis');
    };

    console.log('Tradução não encontrada no Redis');

    try {

        const traducao = await translateText({ text: text, idiomaOrigem: idiomaOrigem, idiomaDestino: idiomaDestino });

        try {
            //Salvar no Redis
            const cachedresponse = await cliente.set(redisKey, JSON.stringify(traducao));

        } catch (error) {
            console.error('Erro ao salvar tradução no banco de dados:', error);
        }

        try {
            //Salvar no banco de dados
            storeMariadb({
                texto_original: text,
                texto_traduzido: traducao[0]['translations'][0].text,
                idioma_origem: idiomaOrigem,
                idioma_destino: idiomaDestino,
                source: 'Azure'
            });

        } catch (error) {
            console.error('Erro ao salvar tradução no banco de dados:', error);
        }

        return res.json({ resource: 'azure', data: traducao });
    
    } catch (error) {
        console.error('Erro ao buscar tradução na API do Azure:', error);
        res.status(500).send('Erro ao buscar tradução na API do Azure');
    }
});


function storeMariadb({ texto_original: texto_original,
    texto_traduzido: texto_traduzido, idioma_origem: idioma_origem, idioma_destino: idioma_destino,
    source: source }) {

    const tradutor = new Tradutor({
        texto_original: texto_original,
        texto_traduzido: texto_traduzido,
        idioma_origem: idioma_origem,
        idioma_destino: idioma_destino,
        source: source
    });
    tradutor.save().catch((error) => {
        console.error('Erro ao salvar tradução no banco de dados:', error);
    });
};

export default router;
