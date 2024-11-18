import { DataTypes } from 'sequelize';
import sequelizeWithDb from './db.js'; // Importa a instância do sequelize como default


// Define o modelo de tradução
const Tradutor = sequelizeWithDb.define('Tradutor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    texto_original: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    texto_traduzido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idioma_origem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idioma_destino: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true // Adiciona automaticamente os campos createdAt
});

export default Tradutor;